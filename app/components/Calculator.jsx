"use client";
import { useState, useMemo } from "react";
import WhatsAppButton from "./WhatsAppButton";

// Форматирование цены в рубли
const rub = (n) => new Intl.NumberFormat("ru-RU").format(Math.round(Number(n) || 0)) + " ₽";

// Базовые цены
const PRICES = {
  miniVideo: 4500,       // до 10 фото
  fullVideoFrom: 8000,   // от 10 фото
  perPhotoNoSong: 225,   // поштучно без песни
  perPhotoWithSong: 180, // поштучно с песней
  oneTwoPhotos: 1350,    // 1-2 фото фикс
  exclusiveSong: 2500,   // песня на заказ
  addText: 100,          // титры/подписи
  musicPick: 150,        // подбор музыки
  rush: 1000,            // срочно 24ч
};

function Toggle({ label, note, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border border-white/10 px-4 py-3 hover:bg-white/5 transition">
      <div className="text-sm">
        <div className="text-slate-100">{label}</div>
        {note && <div className="text-slate-400 text-xs mt-0.5">{note}</div>}
      </div>
      <input
        type="checkbox"
        className="h-5 w-5 rounded border-slate-600 bg-white/5"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  );
}

export default function Calculator() {
  const [mode, setMode] = useState("video"); // video | photos
  const [videoType, setVideoType] = useState("mini"); // mini | full
  const [photos, setPhotos] = useState(10);
  const [withSongOrder, setWithSongOrder] = useState(false);
  const [exclusiveSong, setExclusiveSong] = useState(false);
  const [addText, setAddText] = useState(false);
  const [musicPick, setMusicPick] = useState(false);
  const [rush, setRush] = useState(false);

  // Расчёт стоимости
  const result = useMemo(() => {
    let base = 0;
    let details = [];

    if (mode === "video") {
      if (videoType === "mini") {
        base = PRICES.miniVideo;
        details.push(["Мини-ролик (до 10 фото)", PRICES.miniVideo]);
      } else {
        const photoPrice = photos * (withSongOrder ? PRICES.perPhotoWithSong : PRICES.perPhotoNoSong);
        base = Math.max(PRICES.fullVideoFrom, photoPrice);
        details.push([`Ролик (${photos} фото)`, base]);
      }
    } else {
      if (photos <= 2) {
        base = PRICES.oneTwoPhotos;
        details.push(["1-2 фото", PRICES.oneTwoPhotos]);
      } else {
        const photoPrice = photos * (withSongOrder ? PRICES.perPhotoWithSong : PRICES.perPhotoNoSong);
        base = photoPrice;
        details.push([`${photos} фото`, photoPrice]);
      }
    }

    if (exclusiveSong) {
      base += PRICES.exclusiveSong;
      details.push(["Песня на заказ", PRICES.exclusiveSong]);
    }

    if (addText) {
      base += PRICES.addText;
      details.push(["Титры/подписи", PRICES.addText]);
    }

    if (musicPick) {
      base += PRICES.musicPick;
      details.push(["Подбор музыки", PRICES.musicPick]);
    }

    if (rush) {
      base += PRICES.rush;
      details.push(["Срочно 24ч", PRICES.rush]);
    }

    return { total: base, details };
  }, [mode, videoType, photos, withSongOrder, exclusiveSong, addText, musicPick, rush]);

  // Текст для WhatsApp
  const buildSummary = () => {
    const lines = ["Здравствуйте! Хочу заказать:"];
    if (mode === "video") {
      lines.push(videoType === "mini" ? "• Мини-ролик" : `• Ролик на ${photos} фото`);
    } else {
      lines.push(`• Оживление ${photos} фото`);
    }
    if (exclusiveSong) lines.push("• С песней на заказ");
    if (addText) lines.push("• С титрами/подписями");
    if (musicPick) lines.push("• Нужен подбор музыки");
    if (rush) lines.push("• Срочно (24 часа)");
    lines.push(`\nПримерная стоимость: ${rub(result.total)}`);
    return lines.join("\n");
  };

  return (
    <div className="card-glass p-6">
      <div className="grid gap-6 md:grid-cols-[1fr,auto]">
        <div className="space-y-4">
          {/* Тип заказа */}
          <div className="space-y-2">
            <div className="font-medium mb-2">Что оживляем</div>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <option value="video">Видео-ролик</option>
              <option value="photos">Отдельные фото</option>
            </select>
          </div>

          {/* Количество фото */}
          {mode === "video" && (
            <div className="space-y-2">
              <div className="font-medium mb-2">Формат ролика</div>
              <select
                value={videoType}
                onChange={(e) => setVideoType(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <option value="mini">Мини-ролик (до 10 фото)</option>
                <option value="full">Полный ролик (от 10 фото)</option>
              </select>
            </div>
          )}

          {((mode === "video" && videoType === "full") || mode === "photos") && (
            <div className="space-y-2">
              <div className="font-medium mb-2">Количество фото</div>
              <input
                type="number"
                min={1}
                max={100}
                value={photos}
                onChange={(e) => setPhotos(Math.max(1, Math.min(100, Number(e.target.value) || 0)))}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10"
              />
            </div>
          )}

          {/* Опции */}
          <div className="space-y-2">
            <div className="font-medium mb-2">Дополнительно</div>
            <Toggle
              label="Песня на заказ"
              note="Эксклюзивная песня под вашу историю"
              checked={exclusiveSong}
              onChange={setExclusiveSong}
            />
            <Toggle
              label="Титры и подписи"
              note="Имена, даты и описания"
              checked={addText}
              onChange={setAddText}
            />
            <Toggle
              label="Подбор музыки"
              note="Индивидуальный подбор трека"
              checked={musicPick}
              onChange={setMusicPick}
            />
            <Toggle
              label="Срочно"
              note="Готово за 24 часа"
              checked={rush}
              onChange={setRush}
            />
          </div>
        </div>

        {/* Итоги */}
        <div className="space-y-4">
          <div className="font-medium mb-2">Расчёт стоимости</div>
          <div className="space-y-2 text-sm">
            {result.details.map(([label, price], i) => (
              <div key={i} className="flex justify-between gap-4">
                <span className="text-slate-300">{label}</span>
                <span>{rub(price)}</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-2 mt-4 flex justify-between font-medium">
              <span>Итого</span>
              <span>{rub(result.total)}</span>
            </div>
          </div>
          <div className="pt-4">
            <WhatsAppButton text={buildSummary()} className="w-full justify-center" />
          </div>
        </div>
      </div>
    </div>
  );
}