export interface Request {
  id?: number;
  utilisateurId?: number;
  produitId: number;
  produitNom?: string;  // For display purposes
  quantiteDemandee: number;
  dateDebut: string;
  dateFin: string;
  motif: string;
  statut?: string;  // PENDING, APPROVED, REJECTED
  dateCreation?: string;
  remarquesAdmin?: string;
}
