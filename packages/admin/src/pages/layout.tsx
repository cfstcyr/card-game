import React, { PropsWithChildren } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Icon } from '../components';

interface Props {
    title: string;
    loading: boolean;
    back?: string;
}

export const Layout: React.FC<PropsWithChildren<Props>> = ({
    title,
    loading,
    back,
    children,
}) => {
    return (
        <div className="container card margin:24 padding:12">
            {back && (
                <Link to={back} className="text-decoration:none color:gray">
                    <p>
                        <Icon icon="arrow-left" /> Back
                    </p>
                </Link>
            )}
            <h1 className="mb:12">
                {title} {loading && <Spinner />}
            </h1>

            <main>{children}</main>
        </div>
    );
};
