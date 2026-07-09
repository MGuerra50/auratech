"use client";

import { useEffect, useState } from "react";

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface OffersCountdownProps {
  endsAt: string;
  variant?: "default" | "compact" | "banner";
  className?: string;
}

function getTimeLeft(endsAt: string): CountdownTime {
  const diff = Math.max(0, new Date(endsAt).getTime() - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function CountdownUnit({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant: OffersCountdownProps["variant"];
}) {
  if (variant === "compact") {
    return (
      <span className="min-w-0 text-center">
        <span className="block text-xs font-semibold text-foreground sm:text-sm">
          {value}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-muted sm:text-[10px]">
          {label}
        </span>
      </span>
    );
  }

  if (variant === "banner") {
    return (
      <div className="min-w-0 text-center">
        <div className="rounded-xl bg-background/25 px-2 py-2 font-display text-lg font-bold text-foreground backdrop-blur-sm sm:px-4 sm:text-2xl">
          {value}
        </div>
        <p className="mt-1 text-[10px] uppercase tracking-wider text-foreground/80">
          {label}
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="rounded-xl bg-background/40 px-3 py-2 font-display text-lg font-bold text-foreground backdrop-blur-sm sm:text-xl">
        {value}
      </div>
      <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">{label}</p>
    </div>
  );
}

export function OffersCountdown({
  endsAt,
  variant = "default",
  className,
}: OffersCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>(() =>
    getTimeLeft(endsAt),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(endsAt));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [endsAt]);

  const units = [
    { label: "Dias", value: pad(timeLeft.days) },
    { label: "Hrs", value: pad(timeLeft.hours) },
    { label: "Min", value: pad(timeLeft.minutes) },
    { label: "Seg", value: pad(timeLeft.seconds) },
  ];

  return (
    <div
      className={
        className ??
        (variant === "compact"
          ? "flex items-center justify-center gap-3"
          : "grid grid-cols-4 gap-2 sm:gap-3")
      }
    >
      {units.map((unit) => (
        <CountdownUnit
          key={unit.label}
          label={unit.label}
          value={unit.value}
          variant={variant}
        />
      ))}
    </div>
  );
}
