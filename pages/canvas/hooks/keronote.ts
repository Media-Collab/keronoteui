"use client";
import { KeroContext } from "keronote";
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";

export interface KeroActions {
  // Frame Actions
  addFrame(kero: KeroContext): void;
  deleteFrame(kero: KeroContext): void;
  duplicateFrame(kero: KeroContext): void;
  nextFrame(kero: KeroContext): void;
  prevFrame(kero: KeroContext): void;
  // Player Actions
  play(kero: KeroContext): void;
  stop(kero: KeroContext): void;
  pause(kero: KeroContext): void;
  // File Actions
  //save(kero: KeroContext): void;
  //load(kero: KeroContext): void;
  // Layer Actions
  addLayer(kero: KeroContext): void;
  duplicateLayer(kero: KeroContext): void;
  deleteLayer(kero: KeroContext): void;
  nextLayer(kero: KeroContext): void;
  prevLayer(kero: KeroContext): void;
  undoLayer(kero: KeroContext): void;
  redoLayer(kero: KeroContext): void;
}

export interface KeroProps {
  setTool: Dispatch<SetStateAction<number>>
  setSize: Dispatch<SetStateAction<number>>
  setColor: Dispatch<SetStateAction<number>>
  setDither: Dispatch<SetStateAction<number>>
  setInvert: Dispatch<SetStateAction<boolean>>
  setOnion: Dispatch<SetStateAction<number>>
  setSpeed: Dispatch<SetStateAction<number>>
}

// -------------
// Frame Actions
// -------------

let keroActions: KeroActions = {
  addFrame: function (kero: KeroContext) {
    kero.canvas.insert();
    kero.render();
  },
  
  deleteFrame: function(kero: KeroContext) {
    kero.canvas.remove();
    kero.render();
  },

  duplicateFrame: function(kero: KeroContext) {
    kero.canvas.duplicate();
    kero.render();
  },

  nextFrame: function(kero: KeroContext) {
    kero.player.next();
  },
  prevFrame: function(kero: KeroContext) {
    kero.player.prev();
  },
  
  // --------------
  // Player Actions
  // --------------
  
  play: function(kero: KeroContext) {
    kero.player.play(false, true);
  },
  stop: function(kero: KeroContext) {
    kero.player.stop(true);
  },
  pause: function(kero: KeroContext) {
    kero.player.stop(false);
  },
  
  // ------------
  // Save Actions
  // ------------
  
  /*
  function save(kero: KeroContext) {
    blob = kero.binary.save();
  }
  function load(kero: KeroContext) {
    kero.binary.load(blob);
  }
  */
  
  // -------------
  // Layer Actions
  // -------------
  
  addLayer: function(kero: KeroContext) {
    kero.canvas.frame.insert();
  },
  duplicateLayer: function(kero: KeroContext) {
    kero.canvas.frame.duplicate();
  },
  deleteLayer: function(kero: KeroContext) {
    kero.canvas.frame.remove();
  },
  nextLayer: function(kero: KeroContext) {
    let frame, current;
    frame = kero.canvas.frame;
    current = frame.current;
    frame.current = current + 1;
  },
  prevLayer: function(kero: KeroContext) {
    let frame, current;
    frame = kero.canvas.frame;
    current = frame.current;
    frame.current = current - 1;
  },
  undoLayer: function(kero: KeroContext) {
    kero.history.undo();
  },
  redoLayer: function(kero: KeroContext) {
    kero.history.redo();
  }
}

// ----------------------
// Keronote Hooks Actions
// ----------------------

export const useKeronote = (canvas: MutableRefObject<HTMLCanvasElement>): [KeroContext, KeroActions, KeroProps] => {
  const [kero, setKero] = useState(null);
  const [tool, setTool] = useState(0);
  const [size, setSize] = useState(2);
  const [color, setColor] = useState(1);
  const [dither, setDither] = useState(16);
  const [invert, setInvert] = useState(false);
  const [onion, setOnion] = useState(0);
  const [speed, setSpeed] = useState(0);
  // Arrange All Setters
  const keroProps: KeroProps = {
    setTool,
    setSize,
    setColor,
    setDither,
    setInvert,
    setOnion,
    setSpeed
  };

  // Hook Keronote to Canvas Element
  useEffect(() => {
    setKero(new KeroContext(canvas.current));
  }, [canvas]);

  // Hook When Updating States
  useEffect(() => {
    setTimeout(() => {
      setKero(k => {
        let draw = k.draw;
        draw.tool = tool;
        draw.size = size;
        draw.dither = dither;
        draw.color = color;
        draw.invert = invert;
        k.canvas.onion = onion;
        k.player.speed(speed);
  
        return k;
      });
    });
  }, [tool, size, color, invert, onion, speed]);

  // Return New Context
  return [kero, keroActions, keroProps];
}
