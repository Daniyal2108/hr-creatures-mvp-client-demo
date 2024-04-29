import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import Anchor from "../UI/Anchor";

const SocialIcons = (props) => {
  const socialAccLinks = [
    {
      attr: {
        href: "https://facebook.com",
        className: "!ml-0",
        target: "_blank",
        rel: "noreferrer",
      },
      icon: <FaFacebookF key="fb" className=" w-full" />,
    },
    {
      attr: {
        href: "https://twitter.com",
        target: "_blank",
        rel: "noreferrer",
      },
      icon: <FaTwitter key="twitter" className=" w-full" />,
    },
    {
      attr: {
        href: "https://linkedin.com",
        target: "_blank",
        rel: "noreferrer",
      },
      icon: <FaLinkedinIn key="linkedin" className=" w-full" />,
    },
    {
      attr: {
        href: "https://youtube.com",
        target: "_blank",
        rel: "noreferrer",
      },
      icon: <FaYoutube key="youtube" className=" w-full" />,
    },
    {
      attr: {
        href: "https://instagram.com",
        target: "_blank",
        rel: "noreferrer",
      },
      icon: <FaInstagram key="insta" className=" w-full" />,
    },
  ];

  return (
    <>
      {socialAccLinks.map((attr, index) => (
        <Anchor {...attr} icon={attr.icon} key={index} />
      ))}
    </>
  );
};

export default React.memo(SocialIcons);
