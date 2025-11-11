import { FormEvent, useState } from 'react';

type PasswordModalProps = {
  isOpen: boolean;
  onValidate: (password: string) => boolean;
};

const PasswordModal = ({ isOpen, onValidate }: PasswordModalProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = onValidate(password.trim());

    if (!success) {
      setError('Password errata. Ritenta con la chiave condivisa tra gli esploratori.');
      return;
    }

    setPassword('');
    setError(null);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <header className="modal-header">
          <h1>Trashcoli Urbex Atlas</h1>
          <p>
            Inserisci la parola d’ordine per attivare la modalità curatore. Condividila solo con chi
            rispetta i luoghi che visita.
          </p>
        </header>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="span-2">
            Password
            <input
              autoFocus
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          {error ? <p className="form-error span-2">{error}</p> : null}
          <div className="form-actions span-2">
            <button type="submit" className="btn primary">
              Entra nell’atlante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
