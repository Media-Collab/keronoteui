"use client";
import { KeroContext, KeroFrame, KeroLayer } from "keronote";
import { DependencyList, Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from "react";

type KeroCallback = (k: KeroContext) => void;
type KeroDefer = (cb: KeroCallback) => void;
type KeroBlobCB = (blob: Blob) => void;

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
  save(kero: KeroContext): Blob;
  load(kero: KeroContext, blob: Blob): Promise<any>;
  // Layer Actions
  addLayer(kero: KeroContext): void;
  duplicateLayer(kero: KeroContext): void;
  mergeLayer(kero: KeroContext): void;
  clearLayer(kero: KeroContext): void;
  swapLayer(kero: KeroContext, idx0: number, idx1: number): void;
  deleteLayer(kero: KeroContext): void;
  selectLayer(kero: KeroContext, idx: number): void;
  undoLayer(kero: KeroContext): void;
  redoLayer(kero: KeroContext): void;
}

export interface KeroProps {
  // Current Frame and Layer
  currentFrame: number;
  currentLayer: number;
  layers: Array<KeroFrame>;
  speed: number;

  // Tool and Color Changers
  setTool: Dispatch<SetStateAction<number>>;
  setSize: Dispatch<SetStateAction<number>>;
  setColor: Dispatch<SetStateAction<number>>;
  setDither: Dispatch<SetStateAction<number>>;
  setInvert: Dispatch<SetStateAction<boolean>>;
  setOnion: Dispatch<SetStateAction<number>>;
  setSpeed: Dispatch<SetStateAction<number>>;
}

export interface KeroCanvasActions {
  add(): void;
  duplicate(): void;
  remove(): void;
  next(): void;
  prev(): void;
  // Play and Stop
  play(): void;
  pause(): void;
  stop(): void;
  // Save and Load
  save(kero: KeroBlobCB): void;
  saveThumbnail(thumb: KeroBlobCB): void;
  load(blob: Blob): void;
}

export interface KeroLayerActions {
  // Simple Manipulation
  add(): void;
  duplicate(): void;
  merge(): void;
  clear(): void;
  swap(idx0: number, idx1: number): void;
  remove(): void;
  select(idx: number): void;
  // History
  undo(): void;
  redo(): void;
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
  
  
  save: (kero: KeroContext): Blob => {
    return kero.binary.save();
  },
  load: (kero: KeroContext, blob: Blob) => {
    return kero.binary.load(blob);
  },
  
  // -------------
  // Layer Actions
  // -------------
  
  addLayer: function(kero: KeroContext) {
    kero.canvas.frame.insert();
  },
  duplicateLayer: function(kero: KeroContext) {
    kero.canvas.frame.duplicate();
  },
  mergeLayer: function(kero: KeroContext) {
    kero.canvas.frame.merge();
  },
  clearLayer: function(kero: KeroContext) {
    kero.canvas.frame.clear();
    kero.render();
  },
  swapLayer: function(kero: KeroContext, idx0: number, idx1: number) {
    kero.canvas.frame.swap(idx0, idx1);
    kero.render();
  },
  deleteLayer: function(kero: KeroContext) {
    kero.canvas.frame.remove();
    kero.render();
  },
  selectLayer: function(kero: KeroContext, idx: number) {
    kero.canvas.frame.current = idx;
  },
  undoLayer: function(kero: KeroContext) {
    kero.history.undo();
    kero.render();
  },
  redoLayer: function(kero: KeroContext) {
    kero.history.redo();
    kero.render();
  }
}

// ----------------------
// Keronote Hooks Actions
// ----------------------

export const useKeronote = (canvas: MutableRefObject<HTMLCanvasElement>): [KeroDefer, KeroProps, KeroCanvasActions, KeroLayerActions] => {
  const [kero, setKero] = useState(null);
  const [tool, setTool] = useState(0);
  const [size, setSize] = useState(2);
  const [color, setColor] = useState(1);
  const [dither, setDither] = useState(16);
  const [invert, setInvert] = useState(false);
  const [onion, setOnion] = useState(3);
  const [speed, setSpeed] = useState(0);
  // Canvas Internal Status
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [layers, setLayers] = useState<Array<KeroFrame> | never[]>([]);

  const useDeferKero = (cb: KeroCallback) => {
    setTimeout(() => {
      setKero(k => {
        cb(k);
        return k;
      });
    });
  }

  const useEffectKero = (cb: KeroCallback, deps?: DependencyList) => {
    useEffect(() => {
      useDeferKero(cb);
    }, deps);
  };

  // Hook Keronote to Canvas Element
  useEffect(() => {
    let k = new KeroContext(canvas.current);
    let l = (k.canvas.frame._buffer as Array<KeroLayer>);
    setLayers([...l]);
    // Make Canvas Update Thumbnails
    // Set Keronote
    setKero(k);
  }, [canvas]);

  // Arrange All Setters
  const keroProps: KeroProps = {
    currentFrame,
    currentLayer,
    layers,
    speed,

    setTool,
    setSize,
    setColor,
    setDither,
    setInvert,
    setOnion,
    setSpeed
  };

  // ----------------------------
  // Keronote Canvas Manipulation
  // ----------------------------

  const cbCommonChange = (k: KeroContext) => {
    // Change Current
    let f = k.canvas.frame;
    // Change Layers
    let l = (f._buffer as Array<KeroLayer>);
    setLayers([...l]);
    // Clear Thumbnails
    k.preview.clear()
    console.log(k.canvas);
    console.log(k.preview);
  }

  const cbFrameChange = (cb: KeroCallback) => {
    useDeferKero((k: KeroContext) => {
      cb(k);      
      cbCommonChange(k);
      setCurrentFrame(k.canvas._current);
    });
  };

  const cbLayerChange = (cb: KeroCallback) => {
    useDeferKero((k: KeroContext) => {
      cb(k);
      cbCommonChange(k);
      setCurrentLayer(k.canvas.frame._current);
    });
  };

  const keroCanvasActions: KeroCanvasActions = {
    add: () => cbFrameChange((k: KeroContext) => keroActions.addFrame(k)),
    duplicate: () => cbFrameChange((k: KeroContext) => keroActions.duplicateFrame(k)),
    remove: () => cbFrameChange((k: KeroContext) => keroActions.deleteFrame(k)),
    // Canvas Steppers
    next: () => cbFrameChange((k: KeroContext) => keroActions.nextFrame(k)),
    prev: () => cbFrameChange((k: KeroContext) => keroActions.prevFrame(k)),
    // Play and Stop
    play: () => cbFrameChange((k: KeroContext) => keroActions.play(k)),
    pause: () => cbFrameChange((k: KeroContext) => keroActions.pause(k)),
    stop: () => cbFrameChange((k: KeroContext) => keroActions.stop(k)),
    // Save and Load
    save: (cb: KeroBlobCB) => cbFrameChange((k: KeroContext) => {cb(keroActions.save(k))}),
    saveThumbnail: (cb: KeroBlobCB) => cbFrameChange((k: KeroContext) => {k._element.toBlob(cb)}),
    load: (blob: Blob) => cbFrameChange((k: KeroContext) => {keroActions.load(k, blob).then(e => cbCommonChange(k))})
  };

  // ----------------------------
  // Keronote Layers Manipulation
  // ----------------------------

  const keroLayerActions: KeroLayerActions = {
    add: () => cbLayerChange((k: KeroContext) => keroActions.addLayer(k)),
    duplicate: () => cbLayerChange((k: KeroContext) => keroActions.duplicateLayer(k)),
    merge: () => cbLayerChange((k: KeroContext) => keroActions.mergeLayer(k)),
    clear: () => cbLayerChange((k: KeroContext) => keroActions.clearLayer(k)),
    swap: (idx0: number, idx1: number) => cbLayerChange((k: KeroContext) => keroActions.swapLayer(k, idx0, idx1)),
    remove: () => cbLayerChange((k: KeroContext) => keroActions.deleteLayer(k)),
    select: (idx: number) => cbLayerChange((k: KeroContext) => keroActions.selectLayer(k, idx)),
    // History Management
    undo: () => cbLayerChange((k: KeroContext) => keroActions.undoLayer(k)),
    redo: () => cbLayerChange((k: KeroContext) => keroActions.redoLayer(k)),
  };

  // -------------------
  // Reactive to Changes
  // -------------------

  useEffectKero((k: KeroContext) => {
    let draw = k.draw;
    draw.tool = tool;
    draw.size = size;
    draw.dither = dither;
    draw.color = color;
    draw.invert = invert;
    k.canvas.onion = onion;
    k.player.speed(speed);
  }, [tool, size, color, invert, onion, speed, dither]);

  // Return New Keronote Context
  return [useDeferKero, keroProps, keroCanvasActions, keroLayerActions];
}
