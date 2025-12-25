import { useRef } from "react";

//Función para calcular edad
export function calcularEdad(fechaNacimiento: Date): number {
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const m = hoy.getMonth() - fechaNacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  return edad;
}

export function secondsToHMS(totalSeconds: number) {
  if (!totalSeconds) return { h: 0, m: 0, s: 0 };
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return { h, m, s };
}

export function hmsToSeconds(h: number, m: number, s: number) {
  return h * 3600 + m * 60 + s;
}

//Obtener fecha
export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

//Para los componentes de actualizar puntaje
export function parseTimeText(value: string) {
  // Formato esperado: MM:SS:MS
  const regex = /^(\d{1,2}):(\d{1,2}):(\d{1,4})$/;

  const match = value.match(regex);
  if (!match) return null;

  const [, m, s, ms] = match.map(Number);

  return {
    minutes: m,
    seconds: s,
    millis: ms,
    totalMillis: m * 60_000 + s * 1000 + ms,
  };
}

export function formatTimeText(millis: number) {
  const m = Math.floor(millis / 60000);
  const s = Math.floor((millis % 60000) / 1000);
  const ms = millis % 1000;

  return `${m}:${s.toString().padStart(2, "0")}:${ms}`;
}

//Función de autoupdate para puntajes
export function useDebounce(fn: (...args: any) => void, delay = 600) {
  const ref = useRef<NodeJS.Timeout | null>(null);

  return (...args: any) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => fn(...args), delay);
  };
}
