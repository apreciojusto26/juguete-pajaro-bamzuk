import type { Product } from '@/types/content';

export const product: Product = {
  brand: null,
  name: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto",
  displayName: "Pájaro Interactivo para Gatos",
  tagline: "Despertá el instinto cazador de tu gato, ¡sin que vuele de verdad!",
  subtagline: "Juguete recargable con sonido, movimiento de alas y catnip, para horas de diversión gatuna.",

  // NEVER agent-generated (agents.MD §1) — provision the real Shopify handle
  // before this landing can accept orders.
  commerce: {
    shopifyHandle: 'TODO-provision-in-shared-store',
    bundleOfferActive: false,
  },

  variantGroupLabel: "Modelo",

  errors: {
    network: "No pudimos conectar con la tienda. Probá de nuevo en unos segundos.",
    soldOut: "Esta variante está agotada por el momento.",
    expired: "Tu carrito expiró. Elegí tu opción de nuevo para continuar.",
    noDiscount: "El descuento no se pudo aplicar. El total mostrado es el importe final.",
    generic: "Algo salió mal. Probá de nuevo."
  },

  ratingAverage: 4.9,
  ratingCount: 266,

  badges: [],

  trustTicker: [
    "Diversión garantizada para tu felino",
    "Activación por tacto, fácil de usar",
    "Compra 100% segura"
  ],

  offer: {
    durationMinutes: 0,
    label: "",
    expiredLabel: ""
  },

  benefits: [],

  heroPills: [],

  specs: [],

  packs: [
    {
      id: "x1",
      units: 1,
      freeUnits: 0,
      label: "1 unidad",
      default: true,
      popular: false,
      freeGift: false
    },
    {
      id: "x2",
      units: 2,
      freeUnits: 0,
      label: "2 unidades",
      discountPercent: 5,
      default: false,
      popular: true,
      freeGift: false
    }
  ],

  gallery: [
    {
      id: "g1",
      asset: "product-01",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 1",
      ratio: "4/5"
    },
    {
      id: "g2",
      asset: "product-02",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 2",
      ratio: "4/5"
    },
    {
      id: "g3",
      asset: "product-03",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 3",
      ratio: "4/5"
    },
    {
      id: "g4",
      asset: "product-04",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 4",
      ratio: "4/5"
    },
    {
      id: "g5",
      asset: "product-05",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 5",
      ratio: "4/5"
    },
    {
      id: "g6",
      asset: "product-06",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 6",
      ratio: "4/5"
    },
    {
      id: "g7",
      asset: "product-07",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 7",
      ratio: "4/5"
    }
  ],

  steps: [
    {
      step: 1,
      title: "Cargalo por USB",
      text: "Conectá el pájaro a cualquier puerto USB para una carga rápida y cómoda. ¡Listo para la acción en poco tiempo!",
      media: {
        asset: "product-01",
        alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, paso 1",
        ratio: "4/3"
      }
    },
    {
      step: 2,
      title: "Activá el juego",
      text: "Tocá el pájaro o dejá que tu gato lo haga. El movimiento y el sonido se activarán al instante, captando su atención.",
      media: {
        asset: "product-02",
        alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, paso 2",
        ratio: "4/3"
      }
    },
    {
      step: 3,
      title: "¡A disfrutar!",
      text: "Observá cómo tu gato se divierte cazando y jugando con su nuevo compañero. ¡Horas de entretenimiento aseguradas!",
      media: {
        asset: "product-03",
        alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, paso 3",
        ratio: "4/3"
      }
    }
  ],

  comparison: [
    {
      feature: "Sonido y movimiento realistas",
      ours: true,
      rival: "Estático o con sonidos limitados"
    },
    {
      feature: "Recargable por USB",
      ours: true,
      rival: "Usa pilas desechables"
    },
    {
      feature: "Incluye catnip",
      ours: true,
      rival: false
    },
    {
      feature: "Activación por tacto",
      ours: true,
      rival: "Interruptor manual"
    }
  ],

  heroExtras: [],

  ugcStrip: [
    {
      asset: "product-01",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 1",
      ratio: "9/16"
    },
    {
      asset: "product-02",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 2",
      ratio: "9/16"
    },
    {
      asset: "product-03",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 3",
      ratio: "9/16"
    },
    {
      asset: "product-04",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 4",
      ratio: "9/16"
    },
    {
      asset: "product-05",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 5",
      ratio: "9/16"
    },
    {
      asset: "product-06",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 6",
      ratio: "9/16"
    },
    {
      asset: "product-07",
      alt: "Juguete Interactivo para Gatos, Pájaro Volador Recargable con Sonido y Movimiento (sin volar), con Catnip, Juguete de Peluche Activado por Tacto, imagen 7",
      ratio: "9/16"
    }
  ],

  shipping: {
    freeOverCents: 0
  },

  cta: {
    primary: "¡Mi gato lo necesita!",
    sticky: "Agregar al carrito",
    checkout: "Finalizar compra",
    pending: "Agregando...",
    soldOut: "Agotado"
  },
};
