export const canShare = (content: string | ShareData | undefined): boolean => {
    if (!content) return false;

    return navigator.canShare?.(
        typeof(content) === 'string'
            ? { text: content }
            : content
    ) ?? false;
}

export const share = async (content: string | ShareData | undefined): Promise<void> => {
    if (!content) return;

    if (canShare(content)) {
        try {
            await navigator.share?.(
                typeof(content) === 'string'
                    ? { text: content }
                    : content
            );
        } catch {}
    }
}