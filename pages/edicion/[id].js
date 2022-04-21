import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { EditaLicencia } from '../../components/EditaLicencia';
import { Wrapper } from '../../components/Wrapper';
import { StoreContext } from '../../store';

const VerLicencia = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    state: { licencias },
  } = useContext(StoreContext);
  console.log(licencias);
  const [licencia, setLicencia] = useState(null);
  useEffect(() => {
    if (licencias) {
      const currentLicense = licencias.find((lic) => lic.id === Number(id));
      setLicencia(currentLicense);
    }
  }, [id]);
  console.log(licencia);
  if (!licencia) {
    return (
      <>
        <h2>Error {id}</h2>
      </>
    );
  }

  return (
    <Wrapper>
      <EditaLicencia licencia={licencia} />
    </Wrapper>
  );
};

export default VerLicencia;
