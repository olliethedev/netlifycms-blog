import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Link from "next/link";
import styles from "../styles/Row.module.scss";

const Row = (
  { link, isLinkRoute, title, description, date, dateFormat } = {
    dateFormat: "MMM YYYY",
    isLinkRoute: false,
  }
) => {
  const content = (
    <div className={styles.row}>
      <h2>{title}</h2>
      <sup>
        {date && moment(date, "YYYY-MM-DDTHH:mm:ss.SSS").format(dateFormat)}
      </sup>
      <p>{description}</p>
    </div>
  );
  return isLinkRoute ? (
    <Link href={link}>
      <a>{content}</a>
    </Link>
  ) : (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
};

Row.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateFormat: PropTypes.string,
};

export default Row;
