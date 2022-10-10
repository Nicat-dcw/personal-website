import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme , useModal} from '@nextui-org/react'
import Head from 'next/head'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Icon } from '@iconify/react';
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';
//import {Navbar } from '../components/'
// 2. Call `createTheme` and pass your custom values
import { Container, Button, Card, Row, Text } from "@nextui-org/react";
import { User, Modal } from "@nextui-org/react";
import axios from 'axios'
export default function Home() {
    
const configDc = {
    userId:"852853360612605952"
}
    const configGithub = {
        presence:"Planning to Publish New Projects :)"
    }
    const { setVisible, bindings } = useModal();
    const [user, setUser] = useState({}) || ""
    useEffect(() => {

        const websocket = new WebSocket("wss://api.lanyard.rest/socket")
        
        websocket.onmessage = data => {
            var message = JSON.parse(data.data)
            if (message.op) { 
                if (message.op == 1) {
                    setInterval(() => {
                        websocket.send(JSON.stringify({ op: 3 }))
                    }, message.d.heartbeat_interval)
                    websocket.send(JSON.stringify({ op: 2,  d: {subscribe_to_ids: [configDc.userId]} }))
                }
            }
            if (message.t && (message.t == "INIT_STATE" || message.t == "PRESENCE_UPDATE")) {
                setUser((message.t == "PRESENCE_UPDATE") ? message.d : message.d[configDc.userId])
            }
        }

    }, [])

    const { setTheme } = useNextTheme();
  const { isDark, type, theme } = useTheme();
    const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
        h1:"#fffff"
    }, 
  }
})
    
//const getUser = axios.get(`https://api.discord.com/users/${configDc.userId}`)
    
const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      green: "#3436eb",
        myhero:"linear-gradient(112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%)"
    }, 
  }
})
  
  return (
      <>
          {/*
            <img src={`https://cdn.discordapp.com/avatars/${(user.discord_user) ? user.discord_user.id : "642752306441617417"}/${(user.discord_user) ? user.discord_user.avatar : "1"}.png?size=4096`} className={`h-48 w-48 rounded-full border-2 border-solid ${{idle: "bg-amber-400", dnd: "bg-rose-600", online: "bg-emerald-600", offline: "bg-gray-600"}[user.discord_status]} rounded-full border-4 border-solid ${{idle: "border-amber-500", dnd: "border-rose-600", online: "border-emerald-600", offline: "border-gray-600"}[user.discord_status]}`}/>
              {(user.listening_to_spotify == true) ? user.spotify.song : ((user.listening_to_spotify == false) ? "I am not listening anything right now." : "Loading...")}
                
          */}
            <NextThemesProvider
    defaultTheme="system"//system
    attribute="class"
    value={{
      light: lightTheme.className,
      dark: darkTheme.className
    }}
  >
  <NextUIProvider>
    
  </NextUIProvider>
</NextThemesProvider>
  
    <div className={styles.container}>
      <Head>
        <title>Only Cheeini</title>
        <meta name="description" content="Full Stack Developer" />
          <meta property="og:site_name" content="Only Cheeini"/>
          <meta property="og:image" content={`https://cdn.discordapp.com/avatars/${(user.discord_user) ? user.discord_user.id : configDc.userId}/${(user.discord_user) ? user.discord_user.avatar : "1"}.png?size=4096`}/>
        <link rel="icon" href={`https://cdn.discordapp.com/avatars/${(user.discord_user) ? user.discord_user.id : configDc.userId}/${(user.discord_user) ? user.discord_user.avatar : "1"}.png?size=4096`} />
      </Head>
</div>
  <br/>
          <noscript>Lütfen JavaScript Ayarlarınızı Aktif Hale Getirin!</noscript>
    <Container xl responsive>
      <Card css={{ $$cardColor: '$colors$gradient' }} size="2xl">
        <Card.Body>
            <User
      src={`https://cdn.discordapp.com/avatars/${(user.discord_user) ? user.discord_user.id : configDc.userId}/${(user.discord_user) ? user.discord_user.avatar : "1"}.png?size=4096`}
                name="Only Cheeini"
      description= {(user.listening_to_spotify == true) ? `Listening Spotify` : ((user.listening_to_spotify == false) ? "Full Stack Developer." : "Loading ...") || "Sleeping or Working."}
         onClick={() => setVisible(true)}
    />
            <Modal
        scroll
        width="600px"
                blur
                color="gradient"
                css={{background: "linear-gradient(112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%)"}}
            
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" color="gradient" css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }} size={18}>
            Only Cheeini's Activity Information
          </Text>
        </Modal.Header>
                <Modal.Body>
          <Text id="modal-description">
           <p>   <Icon icon="logos:spotify-icon" /> • {(user.listening_to_spotify == true) ? `${user.spotify.song} Isimli Şarkı`: ((user.listening_to_spotify == false) ? "Not listening 🎧." : "Loading ...") || "Not doing anything."}</p>
         <br/>
              <p>  <Icon icon="icon-park:github" /> • {configGithub.presence || "Not doing anything."}</p>
              </Text>
                </Modal.Body>
</Modal>
          <Row justify="center" align="center">
            <Text h6 size={15} color="white" className="animate-pulse" css={{ m: 0 }}>
               {(user.activities && user.activities.find(s => s.type == 4)) ? (
            <>
            {(user.activities.find(s => s.type == 4).state)}
                    </>
      ) : (<><h1>Not Doing Anything.</h1></>)}
            </Text>
          </Row>
         
        </Card.Body>
      </Card>
    </Container>
      
</>
  )
}
