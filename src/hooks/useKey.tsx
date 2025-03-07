import { use, useEffect, useRef, useState } from 'react';

const useKey = (
  key: string,
  cb: (e: KeyboardEvent) => void,
  combine: boolean = false,
) => {
  const callback = useRef(cb);
  const [last, setLast] = useState<string>('');

  useEffect(() => {
    callback.current = cb;
  });

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      if (!combine) {
        if (event.code === key) {
          callback.current(event);
        } else if (key === 'ctrls' && event.key === 's' && event.ctrlKey) {
          callback.current(event);
        }
      } else {
        if (`${last}+${event.code}` == key) {
          event.preventDefault();
          callback.current(event);
        }
        setLast(event.code);
      }
    }

    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [key, last]);
};

export default useKey;
