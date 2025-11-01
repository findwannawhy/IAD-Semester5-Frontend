import { type AcidSolubleSample } from "./SamplesTypes";

export const SAMPLES_MOCK: AcidSolubleSample[] = [ 
  {
    id: 1,
    title: "Известняк",
    formula: "CaCO3",
    description: "Осадочная порода, состоящая преимущественно из кальцита (карбоната кальция).",
    deleted: false,
    image_url: "izvestnyak.png",
    relative_molecular_mass: 100.07,
    stoichiometric_coefficient: 1 
  },
  {
    id: 2,
    title: "Сода",
    formula: "Na2CO3",
    description: "Карбонат натрия, используется в промышленности и быту.",
    deleted: false,
    image_url: "soda.jpg",
    relative_molecular_mass: 105.99,
    stoichiometric_coefficient: 1
  },
];