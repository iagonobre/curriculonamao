import styles from './home.module.scss';

export default function Home() {
  return (
    <main>
      <section className={styles.mainBackground}>
        <div>
          <header>
            <div>
              <a href="">
                <img src="/assets/logo.svg" alt="Currículo na Mão" />
              </a>
            </div>
            <div>
              <button>
                <img src="/assets/text-icon-plus.svg" alt="" />
              </button>
              <button>
                <img src="/assets/text-icon.svg" alt="" />
              </button>
              <button>
                <img src="/assets/text-icon-less.svg" alt="" />
              </button>
              <button>
                <img src="/assets/contrast.svg" alt="" />
              </button>
              <button>CRIAR CONTA</button>
              <button>ENTRAR</button>
            </div>
          </header>
          <div className={styles.createAccount}>
            <div>
              <h1>Crie seu currículo de forma fácil, acessível e gratuita!</h1>
              <p>Preencha suas informações de modo prático e gere seu currículo no modelo de sua escolha.</p>
              <button>CRIAR MEU CURRÍCULO</button>
              <a href="">
                <img src="/assets/arrow-down.svg" alt="" />
                <p>Saiba Mais</p>
              </a>
            </div>
            <div>
              <img src="/assets/woman-image.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
