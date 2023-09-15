import * as React from 'react';
import { Link } from 'react-router-dom';
import { uuid } from '../../../utils/helpers';

interface Props {
  links: any
}

const BreadCrumb: React.FC<Props> = ({ links }) => (
  <div role="presentation">
    <p>
      {links.map((item: any, i: any, arr: any) =>
        (i !== arr.length - 1 ? (
          <>
            <Link
              className="font-nunitoRegular text-xs text-Kimberly cursor-pointer"
              to={item?.url}
            >
              {item?.path}
            </Link>
            <span className="px-1 font-nunitoRegular text-xs text-Kimberly">{'>'}</span>
          </>
        ) : (
          <a className="font-nunitoRegular text-xs text-Kimberly">{item?.path}</a>
        )))}
    </p>
  </div>
);

export default BreadCrumb;
