import Head from 'next/head'
import Image from 'next/image'
import { parseCookies } from "nookies";

import { Validate, useTicket } from '../services/apiCalls'

export const getServerSideProps = async (ctx) => {
  const { nextAuthToken } = parseCookies(ctx)
  const ticket = `${ctx.query["ticket"]}`

  if (!nextAuthToken) {
    return {
      redirect: {
        destination: '/register?ticket=' + ticket,
        permanent: false
      }
    }
  }

  try {
    const validateResponse = await Validate(nextAuthToken)
  } catch (error) {
    return {
      redirect: {
        destination: '/register/?ticket=' + ticket,
        permanent: false
      }
    }
  }

  try {
    const ticketId = `${ctx.query["ticket"]}`
    console.log('ticketId: ' + ticketId)
    const useTicketResponse = await useTicket(nextAuthToken, { ticketId })

    return { props: { ticketId } }
  } catch (error) {
    console.log(error.response?.data?.error)
    return { props: {} }
  }
}

export default function Ticket({ ticketId }) {
  return (
    <>
      <Head>
        <title>Convite</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>
          <h1>Fom</h1>
          <h1>{ticketId}</h1>
        </div>
      </div>
    </>
  )
}
