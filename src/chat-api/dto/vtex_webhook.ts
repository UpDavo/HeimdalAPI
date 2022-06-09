export interface VtexData {
  Domain: string;
  OrderId: string;
  State: string;
  LastState: string;
  LastChange: Date;
  CurrentChange: Date;
  Origin: Origin;
}

export interface Origin {
  Account: string;
  Key: string;
}
