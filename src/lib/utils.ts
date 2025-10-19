/**
 * Récupère un paramètre d'URL par son nom
 * @param name - Nom du paramètre à récupérer
 * @returns Valeur du paramètre ou null si non trouvé
 */
export const getQueryParam = (name: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}