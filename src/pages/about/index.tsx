import { useRouter } from 'next/router';
import { FiArrowLeft } from 'react-icons/fi';

import { AcessibilityScroll } from "../../components/AccessibilityScroll";

import styles from './about.module.scss';

export default function Account() {
  const router = useRouter();

  function handleGoBack() {
    router.back();
  }

  return (<div className={styles.aboutContainer}>
    <AcessibilityScroll />

    <div className={styles.accountBox}>
      <button onClick={handleGoBack}>
        <FiArrowLeft size={22} />
      </button>
      <div>
        <h3>Quem somos?</h3>
        <div>
          <p>
            O Currículo na Mão é um projeto de pesquisa e inovação contemplado pelo Edital N°18 do Programa Institucional de Bolsas de Iniciação Científica para o Ensino Médio com a Pró Reitoria de Ensino do IFRN. Nossos membros são Damião Victor, Liriel Felix e Iago Nobre, estudantes do IFRN - Campus Parnamirim. Quanto a servidores, temos a Professora Glenda Michele, a Intérprete de Libras Rayanna Evellin e o Professor Bruno Emerson, sendo este último o coordenador do projeto.
            <br />
            <br />
            A ideia do Currículo na Mão é criar uma plataforma capaz de montar currículos de maneira descomplicada, interativa e automática para todos. Mas, além disso, respeitando os princípios de acessibilidade e inclusão nessa atividade, principalmente a pessoas surdas e cegas. Acreditamos, também, no poder do currículo como trampolim para a entrada no mundo do trabalho. Assim, ao incluir pessoas com deficiência (PCDs) nesse processos, temos uma chance de resistir à marginalização constante sofrida por esse grupo.
            <br />
            <br />
            Cumprindo essas metas, pretendemos também contribuir para a pesquisa, estudando nossos resultados com a plataforma, aprimorando-a ao máximo e compartilhando os ensinamentos de inclusão, atentando, como finalidade, fazer uma mudança no mundo de trabalho e científico para PCDs.
          </p>
        </div>
      </div>
    </div>
  </div>)
}