import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react';

import { SignIn } from '../../services/apiCalls'

import styles from '../../styles/Login.module.css'

export const getServerSideProps = async (ctx) => {
  const ticket = `${ctx.query["ticket"]}`

  return { props: { ticket } }
}

export default function Login({ ticket }) {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const submit = async () => {
    setErrorMessage("")
    const data = {
      password,
      email
    }

    try {
      const response = await SignIn(data)
      router.push('/?ticket=' + ticket)
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.form}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email} />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="password">Senha</label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h3>{errorMessage}</h3>
          <Link href="/register">Registrar</Link>
          <div className={styles.inputContainer}>
            <button disabled={password == '' ? true : false} className={styles.button} onClick={submit}>Acessar</button>
          </div>
        </div>
      </div>
    </>
  )
}
