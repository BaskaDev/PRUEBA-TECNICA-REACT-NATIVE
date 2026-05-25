const mockAxiosInstance = {
  interceptors: { request: { use: jest.fn() }, response: { use: jest.fn() } },
  post: jest.fn(),
  get: jest.fn(),
};

jest.mock("axios", () => ({
  create: jest.fn(() => mockAxiosInstance),
  isAxiosError: jest.fn((error) => error?.isAxiosError === true),
}));

global.__mockAxiosInstance = mockAxiosInstance;

const origConsoleError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes("An update to") && args[0].includes("inside a test was not wrapped in act")) {
    return;
  }
  origConsoleError.call(console, ...args);
};

jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve(null)),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve(null)),
  clear: jest.fn(() => Promise.resolve(null)),
}));

jest.mock("react-native-worklets", () => ({
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  createWorklet: (fn) => fn,
  makeMutable: (value) => ({ value }),
  createSerializable: (value) => value,
  isWorkletFunction: () => false,
  WorkletsError: class WorkletsError extends Error {
    constructor(message) {
      super(message);
      this.name = "WorkletsError";
    }
  },
}));

jest.mock("react-native-reanimated", () => {
  const { View, Text, Image, ScrollView, FlatList } = require("react-native");

  const BASE_ENTRY = {
    duration: () => BASE_ENTRY,
    delay: () => BASE_ENTRY,
    springify: () => BASE_ENTRY,
    damping: () => BASE_ENTRY,
    stiffness: () => BASE_ENTRY,
    mass: () => BASE_ENTRY,
    restDisplacementThreshold: () => BASE_ENTRY,
    restSpeedThreshold: () => BASE_ENTRY,
    overshootClamping: () => BASE_ENTRY,
    dampingRatio: () => BASE_ENTRY,
    withCallback: () => BASE_ENTRY,
    randomDelay: () => BASE_ENTRY,
    withInitialValues: () => BASE_ENTRY,
    easing: () => BASE_ENTRY,
    rotate: () => BASE_ENTRY,
    reduceMotion: () => BASE_ENTRY,
    getDelay: () => 0,
    getDelayFunction: () => (fn) => fn(),
    getDuration: () => 300,
    getReduceMotion: () => 0,
    getAnimationAndConfig: () => [() => {}, {}],
    build: () => () => ({ initialValues: {}, animations: {} }),
  };

  const BASE_EXIT = {
    duration: () => BASE_EXIT,
    delay: () => BASE_EXIT,
    springify: () => BASE_EXIT,
    withCallback: () => BASE_EXIT,
    build: () => () => ({ initialValues: {}, animations: {} }),
  };

  const makeAnim = (base) => ({
    create: () => ({ ...base }),
    ...base,
  });

  const builders = {
    FadeIn: makeAnim(BASE_ENTRY),
    FadeInRight: makeAnim(BASE_ENTRY),
    FadeInLeft: makeAnim(BASE_ENTRY),
    FadeInUp: makeAnim(BASE_ENTRY),
    FadeInDown: makeAnim(BASE_ENTRY),
    FadeOut: makeAnim(BASE_EXIT),
    FadeOutRight: makeAnim(BASE_EXIT),
    FadeOutLeft: makeAnim(BASE_EXIT),
    FadeOutUp: makeAnim(BASE_EXIT),
    FadeOutDown: makeAnim(BASE_EXIT),
    SlideInRight: makeAnim(BASE_ENTRY),
    SlideInLeft: makeAnim(BASE_ENTRY),
    SlideOutRight: makeAnim(BASE_EXIT),
    SlideOutLeft: makeAnim(BASE_EXIT),
    SlideInUp: makeAnim(BASE_ENTRY),
    SlideInDown: makeAnim(BASE_ENTRY),
    SlideOutUp: makeAnim(BASE_EXIT),
    SlideOutDown: makeAnim(BASE_EXIT),
    ZoomIn: makeAnim(BASE_ENTRY),
    ZoomInRotate: makeAnim(BASE_ENTRY),
    ZoomInLeft: makeAnim(BASE_ENTRY),
    ZoomInRight: makeAnim(BASE_ENTRY),
    ZoomInUp: makeAnim(BASE_ENTRY),
    ZoomInDown: makeAnim(BASE_ENTRY),
    ZoomOut: makeAnim(BASE_EXIT),
    ZoomOutRotate: makeAnim(BASE_EXIT),
    ZoomOutLeft: makeAnim(BASE_EXIT),
    ZoomOutRight: makeAnim(BASE_EXIT),
    ZoomOutUp: makeAnim(BASE_EXIT),
    ZoomOutDown: makeAnim(BASE_EXIT),
    BounceIn: makeAnim(BASE_ENTRY),
    BounceInDown: makeAnim(BASE_ENTRY),
    BounceInUp: makeAnim(BASE_ENTRY),
    BounceInLeft: makeAnim(BASE_ENTRY),
    BounceInRight: makeAnim(BASE_ENTRY),
    BounceOut: makeAnim(BASE_EXIT),
    BounceOutDown: makeAnim(BASE_EXIT),
    BounceOutUp: makeAnim(BASE_EXIT),
    BounceOutLeft: makeAnim(BASE_EXIT),
    BounceOutRight: makeAnim(BASE_EXIT),
    LightSpeedInRight: makeAnim(BASE_ENTRY),
    LightSpeedInLeft: makeAnim(BASE_ENTRY),
    LightSpeedOutRight: makeAnim(BASE_EXIT),
    LightSpeedOutLeft: makeAnim(BASE_EXIT),
    PinwheelIn: makeAnim(BASE_ENTRY),
    PinwheelOut: makeAnim(BASE_EXIT),
    RotateInDownLeft: makeAnim(BASE_ENTRY),
    RotateInDownRight: makeAnim(BASE_ENTRY),
    RotateInUpLeft: makeAnim(BASE_ENTRY),
    RotateInUpRight: makeAnim(BASE_ENTRY),
    RotateOutDownLeft: makeAnim(BASE_EXIT),
    RotateOutDownRight: makeAnim(BASE_EXIT),
    RotateOutUpLeft: makeAnim(BASE_EXIT),
    RotateOutUpRight: makeAnim(BASE_EXIT),
    RollInLeft: makeAnim(BASE_ENTRY),
    RollInRight: makeAnim(BASE_ENTRY),
    RollOutLeft: makeAnim(BASE_EXIT),
    RollOutRight: makeAnim(BASE_EXIT),
    Layout: makeAnim(BASE_ENTRY),
    LinearTransition: makeAnim(BASE_ENTRY),
    FadingTransition: makeAnim(BASE_ENTRY),
    SequencedTransition: makeAnim(BASE_ENTRY),
    JumpingTransition: makeAnim(BASE_ENTRY),
    CurvedTransition: makeAnim(BASE_ENTRY),
    EntryExitTransition: makeAnim(BASE_ENTRY),
  };

  return {
    useSharedValue: (init) => ({ value: init }),
    useAnimatedStyle: (updater) => updater(),
    useDerivedValue: (processor) => {
      const result = processor();
      return { value: result };
    },
    useAnimatedProps: (updater) => updater(),
    useAnimatedReaction: () => {},
    useAnimatedRef: () => ({ current: null }),
    useAnimatedScrollHandler: () => () => {},
    useAnimatedSensor: () => ({
      sensor: { value: { x: 0, y: 0, z: 0 } },
      unregister: () => {},
      isAvailable: false,
    }),
    useAnimatedKeyboard: () => ({ height: 0, state: 0 }),
    useScrollViewOffset: () => ({ value: 0 }),
    useScrollOffset: () => ({ value: 0 }),
    useEvent: () => () => {},
    runOnJS: (fn) => fn,
    runOnUI: (fn) => fn,
    createWorklet: (fn) => fn,
    makeMutable: (value) => ({ value }),
    createSerializable: (value) => value,
    cancelAnimation: () => {},
    withTiming: (toValue) => toValue,
    withSpring: (toValue) => toValue,
    withDecay: () => 0,
    withDelay: (_, next) => next,
    withRepeat: (anim) => anim,
    withSequence: (...args) => args[0] ?? 0,
    interpolate: () => 0,
    interpolateColor: () => "",
    clamp: (value) => value,
    Extrapolation: { CLAMP: "clamp", EXTEND: "extend", IDENTITY: "identity" },
    Extrapolate: { CLAMP: "clamp", EXTEND: "extend", IDENTITY: "identity" },
    ColorSpace: { RGB: 0, HSV: 1, HWB: 2 },
    Easing: {
      linear: (t) => t,
      ease: (t) => t,
      quad: (t) => t,
      cubic: (t) => t,
      bezier: () => (t) => t,
      in: (easing) => easing,
      out: (easing) => easing,
      inOut: (easing) => easing,
    },
    measure: () => ({
      x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0,
    }),
    scrollTo: () => {},
    processColor: (color) => color,
    enableLayoutAnimations: () => {},
    isReanimated3: () => true,
    ReduceMotion: { System: 0, Always: 1, Never: 2 },
    SensorType: {
      ACCELEROMETER: 1, GYROSCOPE: 2, MAGNETIC_FIELD: 3,
      ROTATION_VECTOR: 4, GRAVITY: 5,
    },
    IOSReferenceFrame: { XArbitraryZVertical: 0, XArbitraryCorrectedZVertical: 1 },
    InterfaceOrientation: { PORTRAIT: 0, LANDSCAPE_LEFT: 1, LANDSCAPE_RIGHT: 2 },
    KeyboardState: { UNKNOWN: 0, OPENING: 1, OPEN: 2, CLOSING: 3, CLOSED: 4 },
    reanimatedVersion: "4.3.1",
    setUpTests: () => {},
    withReanimatedTimer: (fn) => fn(),
    advanceAnimationByTime: () => {},
    advanceAnimationByFrame: () => {},
    getAnimatedStyle: () => ({}),
    ...builders,
    Keyframe: class Keyframe {
      constructor() {}
      duration() { return this; }
      delay() { return this; }
      withCallback() { return this; }
      build() { return () => ({ initialValues: {}, animations: {} }); }
    },
    BaseAnimationBuilder: { create: () => ({ ...BASE_ENTRY }) },
    ComplexAnimationBuilder: { create: () => ({ ...BASE_ENTRY }) },
    createAnimatedComponent: (Component) => Component,
    addWhitelistedUIProps: () => {},
    addWhitelistedNativeProps: () => {},
    default: {
      View, Text, Image, ScrollView, FlatList,
      createAnimatedComponent: (Component) => Component,
    },
    __esModule: true,
  };
});
