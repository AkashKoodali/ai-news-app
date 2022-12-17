import { styled } from "@mui/material/styles";
import React,{ useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import NewsCards from "./components/NewsCards/NewsCards";

const LogoContainer = styled("div")(({ theme }) => ({
  padding: "0 5%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    textAlign: "center",
  },
}));

const InfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Card = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  padding: "3%",
  borderRadius: 10,
  color: "white",
  backgroundColor: "rgba(21, 101, 192)",
  margin: "0 12px",
  textAlign: "center",
  height: "25vmin",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column-reverse",
    textAlign: "center",
    width: "100%",
    height: "initial",
    "&:nth-of-type(1)": {
      marginBottom: "12px",
    },
  },
}));

const LogoImg = styled("img")(({ theme }) => ({
  height: "27vmin",
  borderRadius: "25%",
  padding: "0 5%",
  margin: "3% 0",
  [theme.breakpoints.down("sm")]: {
    height: "35vmin",
  },
}));

const Footer = styled("div")(({ theme }) => ({
  textAlign: "center",
  position: "fixed",
  left: 0,
  bottom: 0,
  color: "black",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "120px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Link = styled("a")(({ theme }) => ({
  textDecoration: "none",
  color: "rgba(21, 101, 192)",
}));

function App() {
  const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticle, setNewsArticle] = useState([]);

  useEffect(()=> {
    alanBtn({
      key:"e6d10a63d2e88016d38c29ae4247633d2e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand:({command, articles, number}) => {
        if(command === 'newsHeadlines') {
          setNewsArticle(articles)
          setActiveArticle(-1)
        }
        else if(command === 'highlight') {
          setActiveArticle((prev) => prev+1);
        }
        else if(command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy:true}): number;
          const article = articles[parsedNumber -1];
          if(parsedNumber > article.length) {
            alanBtn().playText("Please try that again...")
          }else if(article) {
            alanBtn().playText("Opening");
          }else {
            alanBtn().playText("Please try that again..");
          }
         }
      }
    })
  })

  return (
    <div >
      <LogoContainer>
        { newsArticle.length && (
          <div></div>
        )}
        <LogoImg src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" />
      </LogoContainer>
      <NewsCards articles={newsArticle} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
