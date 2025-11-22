export interface Request {
  id?: number;
  utilisateurId?: number;
  produitId?: number;
  produitNom?: string; // If backend sends this
  quantiteDemandee?: number;
  dateDebut?: string;
  dateFin?: string;
  motif?: string;
  statut?: string; // 'PENDING' | 'APPROVED' | 'REJECTED'
  dateRequest?: string;
  dateValidation?: string;
}
