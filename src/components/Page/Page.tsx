/* eslint-disable no-undef */
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { ErrorHandler } from 'components';

interface PagePros {
  title: string;
  description?: string;
  image?: string;
  children: any;
}

const Page = (props: PagePros) => {
  const { title, description = '', image, children } = props;

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {image && <meta name="image" content={image} />}
      </Helmet>
      <ErrorHandler>{children}</ErrorHandler>
    </Fragment>
  );
};

export default Page;
