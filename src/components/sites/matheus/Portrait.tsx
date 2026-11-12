"use client";

import Image from "next/image";
import { useState } from "react";
import { about } from "./content";

const TAPS_TO_FLIP = 10;

export function Portrait() {
  const [taps, setTaps] = useState(0);
  const flipped = taps >= TAPS_TO_FLIP;

  return (
    <div className="portrait reveal">
      <div className="portrait__card" data-flipped={flipped ? "1" : "0"}>
        <div className="portrait__face portrait__face--front" onClick={() => setTaps((n) => n + 1)}>
          <Image
            src={about.portrait}
            alt={about.portraitAlt}
            fill
            sizes="(max-width: 900px) 22rem, 420px"
            className="portrait__img--front"
            priority
          />
        </div>
        <div className="portrait__face portrait__face--back" onClick={() => setTaps(0)}>
          {flipped ? (
            <Image src={about.portraitBack} alt={about.portraitBackAlt} fill sizes="(max-width: 900px) 22rem, 420px" />
          ) : null}
          <p className="portrait__caption">{about.portraitCaption}</p>
        </div>
      </div>
    </div>
  );
}
