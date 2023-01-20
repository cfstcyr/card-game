import styles from './page-instructions.module.scss';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useData } from '../../contexts';
import { Data } from '../../models/data';
import { Game } from '../../models/game';
import { SimpleButton } from '../../components';
import { PageLayout } from '../../components/page-layout/page-layout';

export const PageInstructions: React.FC = () => {
    const { id } = useParams();
    const { games } = useData();
    const [game, setGame] = useState<Data<Game | undefined>>();

    useEffect(() => {
        if (id) {
            setGame(games[id]);
        }
    }, [id, games]);

    return (
        <PageLayout
            className={styles['page-instructions']}
            top={
                <SimpleButton
                    icon={{ icon: 'times', styling: 'regular' }}
                    to="/"
                    // color={id && games[id]?.value?.color}
                />
            }
            bottom={
                <SimpleButton
                    text="Play"
                    to={`/game/${id}`}
                    className={styles['page-instructions__button']}
                    bordered
                />
            }
        >
            <div className={styles['page-instructions__content']}>
                <h1 className={styles['page-instructions__title']}>
                    {game?.value?.name}
                </h1>
                <h2 className={styles['page-instructions__subtitle']}>
                    Instructions
                </h2>

                <div className={styles['page-instructions__instructions']}>
                    <ReactMarkdown>
                        {game?.value?.instructions ?? ''}
                    </ReactMarkdown>
                </div>
            </div>
        </PageLayout>
    );
};
