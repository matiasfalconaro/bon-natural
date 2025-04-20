"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "es" | "fr"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Define translations statically
const translations = {
  en: {
    "site.name": "Bon Natural",
    "site.description": "Discover our curated selection of organic, sustainable, and locally-sourced natural foods.",
    "hero.title": "Natural Foods for a Healthier You",
    "hero.subtitle": "Discover our curated selection of organic, sustainable, and locally-sourced natural foods.",
    "hero.shopNow": "Shop Now",
    "hero.learnMore": "Learn More",

    "categories.title": "Shop by Category",
    "categories.subtitle": "Explore our wide range of natural food categories.",
    "categories.allCategories": "All Categories",

    "featured.title": "Featured Products",
    "featured.subtitle": "Our most popular natural and organic foods, handpicked for quality and taste.",
    "featured.viewAll": "View All Products",

    "testimonials.title": "What Our Customers Say",
    "testimonials.subtitle": "Don't just take our word for it. Here's what our customers have to say about our products.",

    "newsletter.title": "Stay Updated",
    "newsletter.subtitle": "Subscribe to our newsletter for new product announcements, recipes, and exclusive offers.",
    "newsletter.placeholder": "Enter your email",
    "newsletter.subscribe": "Subscribe",
    "newsletter.privacy": "We respect your privacy. Unsubscribe at any time.",

    "nav.home": "Home",
    "nav.products": "All Products",
    "nav.categories": "Categories",
    "nav.about": "About Us",
    "nav.contact": "Contact",

    "product.addToCart": "Add to Cart",

    "footer.copyright": "All rights reserved.",
    "footer.description": "Providing organic, sustainable, and locally-sourced natural foods since 2010.",
    "footer.shop": "Shop",
    "footer.allProducts": "All Products",
    "footer.company": "Company",
    "footer.aboutUs": "About Us",
    "footer.contactUs": "Contact Us",
    "footer.blog": "Blog",
    "footer.careers": "Careers",
    "footer.help": "Help",
    "footer.shippingReturns": "Shipping & Returns",
    "footer.faq": "FAQ",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.termsOfService": "Terms of Service",

    "search.title": "Find Your Natural Products",
    "search.subtitle": "Search for organic, sustainable, and locally-sourced natural foods",
    "search.placeholder": "Search products, categories, or dietary preferences...",
    "search.button": "Search",
    "search.recent": "Recent Searches",
    "search.popular": "Popular Searches",

    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.subtotal": "Subtotal",
    "cart.discount": "Discount",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.clear": "Clear Cart",
    "cart.added": "Added to Cart",
    "cart.addedToCart": "has been added to your cart",
    "cart.open": "Open cart",
    "cart.discountCode": "Discount Code",
    "cart.apply": "Apply",
    "cart.discountApplied": "discount applied",

    "filters.title": "Filters",
    "filters.reset": "Reset",
    "filters.priceRange": "Price Range",
    "filters.categories": "Categories",
    "filters.dietaryPreferences": "Dietary Preferences",

    "products.allProducts": "All Products",
    "products.searchResults": "Search Results",
    "products.noResults": "No products found. Try adjusting your filters.",
    "products.relatedProducts": "You may also like",

    "about.title": "About Us",
    "about.subtitle": "Learn about our mission, values, and the team behind Bon Natural.",
    "about.ourStory": "Our Story",
    "about.ourValues": "Our Values",
    "about.ourTeam": "Our Team",

    "contact.title": "Contact Us",
    "contact.subtitle": "Have questions or feedback? We'd love to hear from you.",
    "contact.getInTouch": "Get in Touch",
    "contact.reachOut": "Reach out to us through any of the following methods.",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.hours": "Business Hours",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",

    "user.login": "Log In",
    "user.register": "Register",
    "user.logout": "Log Out",
    "user.settings": "Settings",

    "login.title": "Log In",
    "login.subtitle": "Welcome back! Please log in to your account.",
    "login.email": "Email",
    "login.password": "Password",
    "login.login": "Log In",
    "login.loggingIn": "Logging in...",
    "login.noAccount": "Don't have an account?",
    "login.forgotPassword": "Forgot password?",
  },
  es: {
    "site.name": "Bon Natural",
    "site.description": "Descubre nuestra selección de alimentos orgánicos, sostenibles y de origen local.",
    "hero.title": "Alimentos Naturales para una Vida Más Saludable",
    "hero.subtitle": "Descubre nuestra selección de alimentos orgánicos, sostenibles y de origen local.",
    "hero.shopNow": "Comprar Ahora",
    "hero.learnMore": "Más Información",

    "categories.title": "Comprar por Categoría",
    "categories.subtitle": "Explora nuestra amplia gama de categorías de alimentos naturales.",
    "categories.allCategories": "Todas las Categorías",

    "featured.title": "Productos Destacados",
    "featured.subtitle": "Nuestros alimentos naturales y orgánicos más populares, seleccionados por su calidad y sabor.",
    "featured.viewAll": "Ver Todos los Productos",

    "testimonials.title": "Lo Que Dicen Nuestros Clientes",
    "testimonials.subtitle": "No solo tome nuestra palabra. Esto es lo que nuestros clientes dicen sobre nuestros productos.",

    "newsletter.title": "Mantente Actualizado",
    "newsletter.subtitle": "Suscríbete a nuestro boletín para recibir anuncios de nuevos productos, recetas y ofertas exclusivas.",
    "newsletter.placeholder": "Ingresa tu correo electrónico",
    "newsletter.subscribe": "Suscribirse",
    "newsletter.privacy": "Respetamos tu privacidad. Cancela la suscripción en cualquier momento.",

    "nav.home": "Inicio",
    "nav.products": "Todos los Productos",
    "nav.categories": "Categorías",
    "nav.about": "Sobre Nosotros",
    "nav.contact": "Contacto",

    "product.addToCart": "Añadir al Carrito",
    "footer.copyright": "Todos los derechos reservados.",
    "footer.description": "Proporcionando alimentos naturales orgánicos, sostenibles y de origen local desde 2010.",
    "footer.shop": "Tienda",

    "footer.allProducts": "Todos los Productos",

    "footer.company": "Empresa",
    "footer.aboutUs": "Sobre Nosotros",
    "footer.contactUs": "Contáctanos",
    "footer.blog": "Blog",
    "footer.careers": "Empleos",
    "footer.help": "Ayuda",
    "footer.shippingReturns": "Envíos y Devoluciones",
    "footer.faq": "Preguntas Frecuentes",
    "footer.privacyPolicy": "Política de Privacidad",
    "footer.termsOfService": "Términos del Servicio",

    "search.title": "Encuentra Tus Productos Naturales",
    "search.subtitle": "Busca alimentos orgánicos, sostenibles y de origen local",
    "search.placeholder": "Buscar productos, categorías o preferencias dietéticas...",
    "search.button": "Buscar",
    "search.recent": "Búsquedas Recientes",
    "search.popular": "Búsquedas Populares",

    "cart.title": "Tu Carrito",
    "cart.empty": "Tu carrito está vacío",
    "cart.subtotal": "Subtotal",
    "cart.discount": "Descuento",
    "cart.total": "Total",
    "cart.checkout": "Finalizar Compra",
    "cart.clear": "Vaciar Carrito",
    "cart.added": "Añadido al Carrito",
    "cart.addedToCart": "ha sido añadido a tu carrito",
    "cart.open": "Abrir carrito",
    "cart.discountCode": "Código de Descuento",
    "cart.apply": "Aplicar",
    "cart.discountApplied": "descuento aplicado",

    "filters.title": "Filtros",
    "filters.reset": "Restablecer",
    "filters.priceRange": "Rango de Precio",
    "filters.categories": "Categorías",
    "filters.dietaryPreferences": "Preferencias Dietéticas",

    "products.allProducts": "Todos los Productos",
    "products.searchResults": "Resultados de Búsqueda",
    "products.noResults": "No se encontraron productos. Intenta ajustar tus filtros.",
    "products.relatedProducts": "También te puede interesar",

    "about.title": "Sobre Nosotros",
    "about.subtitle": "Conoce nuestra misión, valores y el equipo detrás de Bon Natural.",
    "about.ourStory": "Nuestra Historia",
    "about.ourValues": "Nuestros Valores",
    "about.ourTeam": "Nuestro Equipo",

    "contact.title": "Contáctanos",
    "contact.subtitle": "¿Tienes preguntas o comentarios? Nos encantaría saber de ti.",
    "contact.getInTouch": "Ponte en Contacto",
    "contact.reachOut": "Comunícate con nosotros a través de cualquiera de los siguientes métodos.",
    "contact.address": "Dirección",
    "contact.phone": "Teléfono",
    "contact.email": "Correo Electrónico",
    "contact.hours": "Horario de Atención",
    "contact.form.name": "Nombre",
    "contact.form.email": "Correo Electrónico",
    "contact.form.subject": "Asunto",
    "contact.form.message": "Mensaje",
    "contact.form.send": "Enviar Mensaje",
    "contact.form.sending": "Enviando...",

    "user.login": "Iniciar Sesión",
    "user.register": "Registrarse",
    "user.logout": "Cerrar Sesión",
    "user.settings": "Configuración",

    "login.title": "Iniciar Sesión",
    "login.subtitle": "¡Bienvenido de nuevo! Por favor, inicia sesión en tu cuenta.",
    "login.email": "Correo Electrónico",
    "login.password": "Contraseña",
    "login.login": "Iniciar Sesión",
    "login.loggingIn": "Iniciando sesión...",
    "login.noAccount": "¿No tienes una cuenta?",
    "login.forgotPassword": "¿Olvidaste tu contraseña?",
  },
  fr: {
    "site.name": "Bon Natural",
    "site.description": "Découvrez notre sélection d'aliments biologiques, durables et d'origine locale.",
    "hero.title": "Des Aliments Naturels pour une Vie Plus Saine",
    "hero.subtitle": "Découvrez notre sélection d'aliments biologiques, durables et d'origine locale.",
    "hero.shopNow": "Acheter Maintenant",
    "hero.learnMore": "En Savoir Plus",

    "categories.title": "Acheter par Catégorie",
    "categories.subtitle": "Explorez notre large gamme de catégories d'aliments naturels.",
    "categories.allCategories": "Toutes les Catégories",

    "featured.title": "Produits Vedettes",
    "featured.subtitle": "Nos aliments naturels et biologiques les plus populaires, sélectionnés pour leur qualité et leur goût.",
    "featured.viewAll": "Voir Tous les Produits",

    "testimonials.title": "Ce Que Disent Nos Clients",
    "testimonials.subtitle": "Ne prenez pas seulement notre parole. Voici ce que nos clients disent de nos produits.",

    "newsletter.title": "Restez Informé",
    "newsletter.subtitle": "Abonnez-vous à notre newsletter pour les annonces de nouveaux produits, les recettes et les offres exclusives.",
    "newsletter.placeholder": "Entrez votre email",
    "newsletter.subscribe": "S'abonner",
    "newsletter.privacy": "Nous respectons votre vie privée. Désabonnez-vous à tout moment.",

    "nav.home": "Accueil",
    "nav.products": "Tous les Produits",
    "nav.categories": "Catégories",
    "nav.about": "À Propos",
    "nav.contact": "Contact",

    "footer.copyright": "Tous droits réservés.",
    "footer.description": "Fournir des aliments naturels biologiques, durables et locaux depuis 2010.",
    "footer.shop": "Boutique",
    "footer.allProducts": "Tous les Produits",
    "footer.company": "Entreprise",
    "footer.aboutUs": "À Propos",
    "footer.contactUs": "Contactez-Nous",
    "footer.blog": "Blog",
    "footer.careers": "Carrières",
    "footer.help": "Aide",
    "footer.shippingReturns": "Expédition et Retours",
    "footer.faq": "FAQ",
    "footer.privacyPolicy": "Politique de Confidentialité",
    "footer.termsOfService": "Conditions d’Utilisation",

    "search.title": "Trouvez Vos Produits Naturels",
    "search.subtitle": "Recherchez des aliments biologiques, durables et d'origine locale",
    "search.placeholder": "Rechercher produits, catégories ou préférences alimentaires...",
    "search.button": "Rechercher",
    "search.recent": "Recherches Récentes",
    "search.popular": "Recherches Populaires",

    "cart.title": "Votre Panier",
    "cart.empty": "Votre panier est vide",
    "cart.subtotal": "Sous-total",
    "cart.discount": "Remise",
    "cart.total": "Total",
    "cart.checkout": "Commander",
    "cart.clear": "Vider le Panier",
    "cart.added": "Ajouté au Panier",
    "cart.addedToCart": "a été ajouté à votre panier",
    "cart.open": "Ouvrir le panier",
    "cart.discountCode": "Code de Réduction",
    "cart.apply": "Appliquer",
    "cart.discountApplied": "réduction appliquée",

    "filters.title": "Filtres",
    "filters.reset": "Réinitialiser",
    "filters.priceRange": "Gamme de Prix",
    "filters.categories": "Catégories",
    "filters.dietaryPreferences": "Préférences Alimentaires",

    "products.allProducts": "Tous les produits",
    "products.searchResults": "Résultats de recherche",
    "products.noResults": "Aucun produit trouvé. Essayez de modifier vos filtres.",
    "products.relatedProducts": "Vous pourriez aussi aimer",

    "about.title": "À Propos de Nous",
    "about.subtitle": "Découvrez notre mission, nos valeurs et l'équipe derrière Bon Natural.",
    "about.ourStory": "Notre Histoire",
    "about.ourValues": "Nos Valeurs",
    "about.ourTeam": "Notre Équipe",

    "contact.title": "Contactez-Nous",
    "contact.subtitle": "Vous avez des questions ou des commentaires? Nous aimerions vous entendre.",
    "contact.getInTouch": "Entrer en Contact",
    "contact.reachOut": "Contactez-nous par l'une des méthodes suivantes.",
    "contact.address": "Adresse",
    "contact.phone": "Téléphone",
    "contact.email": "Email",
    "contact.hours": "Heures d'Ouverture",
    "contact.form.name": "Nom",
    "contact.form.email": "Email",
    "contact.form.subject": "Sujet",
    "contact.form.message": "Message",
    "contact.form.send": "Envoyer le Message",
    "contact.form.sending": "Envoi en cours...",

    "user.login": "Se Connecter",
    "user.register": "S'inscrire",
    "user.logout": "Se Déconnecter",
    "user.settings": "Paramètres",

    "login.title": "Se Connecter",
    "login.subtitle": "Bienvenue! Veuillez vous connecter à votre compte.",
    "login.email": "Email",
    "login.password": "Mot de passe",
    "login.login": "Se Connecter",
    "login.loggingIn": "Connexion en cours...",
    "login.noAccount": "Vous n'avez pas de compte?",
    "login.forgotPassword": "Mot de passe oublié?",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Helper function to get initial language from localStorage (client-side only)
const getInitialLanguage = (): Language => {
  if (typeof window !== "undefined") {
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language | null
    if (savedLanguage && ["en", "es", "fr"].includes(savedLanguage)) {
      return savedLanguage
    }
  }
  return "en" // Default language
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en") // Start with default, will be updated in useEffect
  const [isInitialized, setIsInitialized] = useState(false)

  // Run once on mount to set initial language from localStorage
  useEffect(() => {
    const initialLang = getInitialLanguage()
    setLanguage(initialLang)
    document.documentElement.lang = initialLang
    setIsInitialized(true)
  }, [])

  // Run when language changes (but not on initial mount)
  useEffect(() => {
    if (!isInitialized) return

    // Update localStorage and HTML lang attribute
    localStorage.setItem("preferredLanguage", language)
    document.documentElement.lang = language
  }, [language, isInitialized])

  // Translation function
  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
