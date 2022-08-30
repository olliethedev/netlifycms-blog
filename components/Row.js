import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Link from "next/link";

const Row = (
  {
    link,
    isLinkRoute,
    title,
    description,
    date,
    dateFormat,
    image,
    category,
  } = {
    dateFormat: "MMM YYYY",
    isLinkRoute: false,
  }
) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        {image && (
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
            alt=""
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600 capitalize">
            <a href="#" className="hover:underline">
              {category}
            </a>
          </p>

          {isLinkRoute ? (
            <Link href={link}>
              <a>
                <p className="text-xl font-semibold text-gray-900">{title}</p>
                <p className="mt-3 text-base text-gray-500">{description}</p>
              </a>
            </Link>
          ) : (
            <a href={link} target="_blank" rel="noopener noreferrer">
              <p className="text-xl font-semibold text-gray-900">{title}</p>
              <p className="mt-3 text-base text-gray-500">{description}</p>
            </a>
          )}
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href="#">
              <span className="sr-only">Ollie The Dev</span>
              <img
                className="h-10 w-10 rounded-full"
                src="logo192.png"
                alt=""
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a href="#" className="hover:underline">
                Ollie The Dev
              </a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={date}>
                {date &&
                  moment(date, "YYYY-MM-DDTHH:mm:ss.SSS").format(dateFormat)}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>5min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Row.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
  dateFormat: PropTypes.string,
};

export default Row;
