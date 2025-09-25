import "@testing-library/jest-dom"

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock geolocation
global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn(),
}

// Mock Web Speech API
global.SpeechRecognition = class SpeechRecognition {
  constructor() {
    this.continuous = false
    this.interimResults = false
    this.lang = "en-US"
    this.onstart = null
    this.onresult = null
    this.onerror = null
    this.onend = null
  }
  start() {}
  stop() {}
  abort() {}
}

global.webkitSpeechRecognition = global.SpeechRecognition

global.speechSynthesis = {
  speak: jest.fn(),
  cancel: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getVoices: jest.fn(() => []),
}

global.SpeechSynthesisUtterance = class SpeechSynthesisUtterance {
  constructor(text) {
    this.text = text
    this.voice = null
    this.volume = 1
    this.rate = 1
    this.pitch = 1
    this.onstart = null
    this.onend = null
    this.onerror = null
  }
}
