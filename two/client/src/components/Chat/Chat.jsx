import React, {useState} from 'react';
import "./Chat.css";
import profile from "../../assets/default_profile.jfif";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const langs = {
  ori: "Origin",
  auto: 'Automatic',
  af: 'Afrikaans',
  sq: 'Albanian',
  ar: 'Arabic',
  hy: 'Armenian',
  az: 'Azerbaijani',
  eu: 'Basque',
  be: 'Belarusian',
  bn: 'Bengali',
  bs: 'Bosnian',
  bg: 'Bulgarian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  ny: 'Chichewa',
  'zh-cn': 'Chinese Simplified',
  'zh-tw': 'Chinese Traditional',
  co: 'Corsican',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  nl: 'Dutch',
  en: 'English',
  eo: 'Esperanto',
  et: 'Estonian',
  tl: 'Filipino',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Frisian',
  gl: 'Galician',
  ka: 'Georgian',
  de: 'German',
  el: 'Greek',
  gu: 'Gujarati',
  ht: 'Haitian Creole',
  ha: 'Hausa',
  haw: 'Hawaiian',
  iw: 'Hebrew',
  hi: 'Hindi',
  hmn: 'Hmong',
  hu: 'Hungarian',
  is: 'Icelandic',
  ig: 'Igbo',
  id: 'Indonesian',
  ga: 'Irish',
  it: 'Italian',
  ja: 'Japanese',
  jw: 'Javanese',
  kn: 'Kannada',
  kk: 'Kazakh',
  km: 'Khmer',
  ko: 'Korean',
  ku: 'Kurdish (Kurmanji)',
  ky: 'Kyrgyz',
  lo: 'Lao',
  la: 'Latin',
  lv: 'Latvian',
  lt: 'Lithuanian',
  lb: 'Luxembourgish',
  mk: 'Macedonian',
  mg: 'Malagasy',
  ms: 'Malay',
  ml: 'Malayalam',
  mt: 'Maltese',
  mi: 'Maori',
  mr: 'Marathi',
  mn: 'Mongolian',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  no: 'Norwegian',
  ps: 'Pashto',
  fa: 'Persian',
  pl: 'Polish',
  pt: 'Portuguese',
  ma: 'Punjabi',
  ro: 'Romanian',
  ru: 'Russian',
  sm: 'Samoan',
  gd: 'Scots Gaelic',
  sr: 'Serbian',
  st: 'Sesotho',
  sn: 'Shona',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somali',
  es: 'Spanish',
  su: 'Sudanese',
  sw: 'Swahili',
  sv: 'Swedish',
  tg: 'Tajik',
  ta: 'Tamil',
  te: 'Telugu',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  cy: 'Welsh',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zu: 'Zulu'
};

const timeSince = (date) => {

  let seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return "just now";
};

const Chat = ({chat, mine, friend, name}) => {
  const public_folder_profile = process.env.REACT_PUBLIC_FOLDER_PROFILES;
  const [message, setMessage] = useState(chat.text);

  const handleLangChange = async(e, key) => {
    if(key === "ori"){
      setMessage(chat.text);
    } else {
      try{
        const translated = await axios.post("http://localhost:8000/messages/translate/text", {
          text: message,
          lang: key
        })

        setMessage(translated.data)
      } catch (error){
        console.log(error);
      }
    }
  }
  // Private message
  if(!name){
    return (
    <div className={mine ? "chat mine": "chat"}>
      {mine ? (
          <div className="chatTop">
            <img src={friend ? public_folder_profile + friend : profile} alt="" className="chatImg"/>
            <p className="chatText">{message}</p>
          </div>
      ) : (
        <div className="chatTop">
          <img src={friend ? public_folder_profile + friend : profile} alt="" className="chatImg"/>
          <p className="chatText">{message}</p>
          <Dropdown className="ms-3 mt-1">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <FontAwesomeIcon icon="globe"/>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {Object.keys(langs).map(function(key, index) {
                return(
                  <Dropdown.Item id={langs[key]} key={key} onClick={(e) => handleLangChange(e, key)}>{langs[key]}</Dropdown.Item>
                )
              })}
              
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}
        <div className='chatBottom'>{timeSince(chat.createdAt)}</div>
    </div>
    )
    // Channel Message
  } else {
    return (
      <div className={mine ? "chat mine": "chat"}>
        {mine ? (
          <div className="chatTop">
            <img src={friend ? public_folder_profile + friend : profile} alt="" className="chatImg"/>
            <p className="chatText">{message}</p>
          </div>
      ) : (
          <div className="chatTop">
              <img src={friend ? public_folder_profile + friend : profile} alt="" className="chatImg"/>
              <div className="d-flex">
                <div>
                  <div style={{fontSize:"12px"}} className="ms-1">{name}</div>
                  <p className="chatText">{message}</p>
                </div>
                <Dropdown className="mt-4">
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    <FontAwesomeIcon icon="globe"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {Object.keys(langs).map(function(key, index) {
                        return(
                          <Dropdown.Item id={langs[key]} key={key} onClick={(e) => handleLangChange(e, key)}>{langs[key]}</Dropdown.Item>
                        )
                      })}
                      
                    </Dropdown.Menu>
                  </Dropdown>
            </div>
          </div>
              
      )}
          <div className='chatBottom'>{timeSince(chat.createdAt)}</div>
      </div>
      )
  }
};

export default Chat;
