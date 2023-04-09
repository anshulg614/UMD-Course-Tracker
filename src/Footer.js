import React from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterContainer>
      <p>Created by Anshul Ganumpally, Rahul Anantuni, Ritvik Venkat, Sam Sanjith</p>
      <Link href="https://github.com/anshulg614/UMD-Course-Tracker" target="_blank">
        <FaGithub />
      </Link>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.1rem;
  background-color: #e21834;
  color: white;
  z-index: 999;
`;

const Link = styled.a`
  position: relative;
  top: 0.2rem;
  margin-left: 1rem;
  color: "#eee";
  font-size: 2rem;
  &:hover {
    color: "#ccc";
  }
  &:active {
    color: "#aaa";
  }
`;

export default Footer;