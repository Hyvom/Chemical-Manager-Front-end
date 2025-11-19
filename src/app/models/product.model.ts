export interface Product {
  id?: number;
  nom: string;
  formule: string;
  categorie: string;
  quantite: number;
  unite: string;
  datePeremption?: string;
  localisation?: string;
  dangereux: boolean;
  description?: string;
  etat: string;           // Add this
  prixUnitaire: number;   // Add this
  fournisseur: string;    // Add this
}
