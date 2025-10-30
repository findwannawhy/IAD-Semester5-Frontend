// components/SamplesList/SamplesList.tsx
import './SamplesList.css';
import SampleCard from '../SampleCard/SampleCard';
import { type AcidSolubleSample } from '../../modules/SamplesTypes';




export default function SamplesList({ samples }: {samples: AcidSolubleSample[]}) {
  return (
    <div className="grid-list">
      {samples.map((s) => (
        <SampleCard key={s.id} sample={s} />  
      ))}
    </div>
  );
}