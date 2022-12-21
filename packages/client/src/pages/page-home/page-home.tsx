import React from 'react';
import { GameButton } from '../../components';
import { useData } from '../../contexts/game-data-context/context';

export const PageHome: React.FC = () => {
    const { games } = useData();

    return (
        <div className="d:flex flex:col gap:24 padding:48 justify-content:center align-items:center">
            {games.error ? (
                <p>Error loading games</p>
            ) : (
                games.value.map((game, i) => (
                    <GameButton
                        key={game.id}
                        game={game}
                        className="w:100% max-w:400"
                        theme={(i % 5) + 1}
                    />
                ))
            )}
        </div>
    );
};
