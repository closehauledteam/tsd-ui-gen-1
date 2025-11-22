export interface ScanService {
  parse(rawCode: string): Promise<{ ok: true; itemId: string } | { ok: false; error: string }>;
}

export interface InventoryService {
  checkItemAvailable(itemId: string, qty: number): Promise<{ ok: true } | { ok: false; error: string }>;
}

export interface PrintService {
  printLabel(itemId: string, qty: number): Promise<void>;
}

export interface AppServices {
  scan: ScanService;
  inventory: InventoryService;
  print: PrintService;
}
