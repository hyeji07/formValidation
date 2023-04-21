interface optionsType {
  value: string;
  content: string;
}

export interface SelectOptionInterface {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectId?: string;
  optionsLists?: optionsType[];
}
