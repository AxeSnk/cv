import {photoSrc} from '../../../shared/assets/photo';

/** Круглый аватар с декоративным градиентным кольцом. */
export function Avatar() {
  return (
    <div className="avatar-wrap">
      <img className="avatar" src={photoSrc} alt="Фото" width="180" height="180" loading="eager" />
    </div>
  );
}
