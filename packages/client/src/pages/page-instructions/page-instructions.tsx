import styles from './page-instructions.module.scss';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { useGameData } from '../../contexts';
import { Data } from '../../models/data';
import { GameListItem } from '../../models/game';
import { SimpleButton } from '../../components';
import { PageLayout } from '../../components/page-layout/page-layout';
import { GamePills } from '../../components/game-card/game-pills';

export const PageInstructions: React.FC = () => {
    const { id } = useParams();
    const { games } = useGameData();
    const [game, setGame] = useState<Data<GameListItem>>();

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

                {game?.value && (
                    <GamePills
                        game={game?.value}
                        className="w:100% justify-content:center"
                    />
                )}

                <div className={styles['page-instructions__instructions']}>
                    <ReactMarkdown>
                        {game?.value?.instructions ?? ''}
                    </ReactMarkdown>
                </div>
            </div>
        </PageLayout>
    );
};
