export interface Product {
  id?: number;
  nom: string;
  formule: string;
  quantite: number;
  datePeremption: string;
  categorie: string;
  etat: string;
  prixUnitaire: number;
  fournisseur: string;
  remarques?: string;
}
