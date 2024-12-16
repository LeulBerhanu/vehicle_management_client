import React from "react";
import mongodb from "/images/mongodb.svg";
import express from "/images/express.png";
import react from "/images/react.png";
import node from "/images/node.png";
import tanstack from "/images/tanstack.png";
import Icon from "@/components/Icon";

const Footer = () => {
  return (
    <div className="py-10">
      <div className="flex gap-4 justify-center">
        <Icon content="Tanstack">
          <img
            className="w-10 h-10 object-contain hover:-translate-y-1 transition duration-300 "
            src={tanstack}
            alt=""
          />
        </Icon>
        <Icon content="Mongodb">
          <img
            className="w-10 h-10 object-contain hover:-translate-y-1 transition duration-300 "
            src={mongodb}
            alt=""
          />
        </Icon>
        <Icon content="Express JS">
          <img
            className="w-10 h-10 object-contain hover:-translate-y-1 transition duration-300 "
            src={express}
            alt=""
          />
        </Icon>
        <Icon content="React JS">
          <img
            className="w-10 h-10 object-contain hover:-translate-y-1 transition duration-300 "
            src={react}
            alt=""
          />
        </Icon>
        <Icon content="Node JS">
          <img
            className="w-10 h-10 object-contain hover:-translate-y-1 transition duration-300 "
            src={node}
            alt=""
          />
        </Icon>
      </div>
    </div>
  );
};

export default Footer;
