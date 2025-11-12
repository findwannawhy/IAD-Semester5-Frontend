import { Link } from "react-router-dom";
import type { AcidSolubleSample } from "../../modules/SamplesTypes";

import './SampleCard.css';
import { useState, useEffect } from 'react';
import defaultSampleImage from '../../assets/noimg.png';
import { dest_img } from '../../target_config';

export default function SampleCard({ sample }: { sample: AcidSolubleSample }) {
    const [imageError, setImageError] = useState(false);
    
    const getImageUrl = (filename: string) => {
        if (!filename) return defaultSampleImage;
        return `${dest_img}/img/${filename}`;
    };

    const [imageUrl, setImageUrl] = useState(getImageUrl(sample.image_url));

    useEffect(() => {
        if (!sample.image_url) {
            setImageUrl(defaultSampleImage);
        } else {
            setImageUrl(getImageUrl(sample.image_url));
        }
    }, [sample.image_url]);

    const handleImageError = () => {
        setImageError(true);
        setImageUrl(defaultSampleImage);
    };

    return (
        <div className="sample-card">
            <div className="sample-image">
                <img 
                    src={imageError ? defaultSampleImage : imageUrl}
                    alt={sample.title}
                    onError={handleImageError}
                />
            </div>
            <div className="sample-body">
                <div className="sample-name">
                    <span>{sample.title} ({sample.formula})</span>
                </div>
                <div className="sample-texts">
                    <div className="sample-description">
                        <span className="description-text">{sample.description}</span>
                        <div className="frame"></div>
                    </div>
                </div>
                <div className="material-data">
                    <div className="relative-molecular-mass">
                        <span className="label-bold">Отн. молекулярная масса:</span>
                        <span className="value">{sample.relative_molecular_mass?.toFixed(2) ?? 'N/A'} г/моль</span>
                    </div>
                    <div className="stoichiometric-coefficient">
                        <span className="label-bold">Стехиометрический коэффициент:</span>
                        <span className="value">{sample.stoichiometric_coefficient ?? 'N/A'}</span>
                    </div>
                </div>
                <div className="sample-buttons">
                    <Link to={`/samples/${sample.id}`} className="details-button">
                        <span className="button-text">Подробнее</span>
                    </Link>
                    {/* <button className="add-button">
                        <span className="button-text">Добавить</span>
                    </button> */}
                </div>
            </div>
        </div>
  );
}

