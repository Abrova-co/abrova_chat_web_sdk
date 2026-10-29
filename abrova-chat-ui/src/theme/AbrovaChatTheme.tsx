import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

/**
 * AbrovaChat-specific colors
 */
export interface AbrovaChatColors {
  myMessageBubble: string;
  otherMessageBubble: string;
  myMessageText: string;
  otherMessageText: string;
  timestampText: string;
  linkText: string;
  onlineIndicator: string;
  offlineIndicator: string;
  typingIndicator: string;
  readReceipt: string;
  unreadReceipt: string;
  failedMessage: string;
  pendingMessage: string;
  replyBackground: string;
  mentionHighlight: string;
  /** Screen and input bar background. */
  background?: string;
  /** Text field and menu surfaces. */
  surface?: string;
  /** Separator lines. */
  border?: string;
}

/**
 * AbrovaChat-specific dimensions
 */
export interface AbrovaChatDimensions {
  messageBubbleRadius: number;
  messagePadding: number;
  avatarSize: number;
  smallAvatarSize: number;
  inputFieldRadius: number;
  maxBubbleWidthRatio: number;
  imagePreviewSize: number;
  reactionPillRadius: number;
}

export interface AbrovaChatThemeValue {
  colors: AbrovaChatColors;
  dimensions: AbrovaChatDimensions;
  isDark: boolean;
}

const defaultLightColors: AbrovaChatColors = {
  myMessageBubble: '#007AFF',
  otherMessageBubble: '#E9E9EB',
  myMessageText: '#FFFFFF',
  otherMessageText: '#000000',
  timestampText: '#8E8E93',
  linkText: '#007AFF',
  onlineIndicator: '#34C759',
  offlineIndicator: '#C7C7CC',
  typingIndicator: '#8E8E93',
  readReceipt: '#007AFF',
  unreadReceipt: '#8E8E93',
  failedMessage: '#FF3B30',
  pendingMessage: '#8E8E93',
  replyBackground: '#F2F2F7',
  mentionHighlight: 'rgba(0, 122, 255, 0.2)',
  background: '#FFFFFF',
  surface: '#F2F2F7',
  border: '#E5E5EA',
};

const defaultDarkColors: AbrovaChatColors = {
  myMessageBubble: '#0A84FF',
  otherMessageBubble: '#2C2C2E',
  myMessageText: '#FFFFFF',
  otherMessageText: '#FFFFFF',
  timestampText: '#8E8E93',
  linkText: '#0A84FF',
  onlineIndicator: '#30D158',
  offlineIndicator: '#636366',
  typingIndicator: '#8E8E93',
  readReceipt: '#0A84FF',
  unreadReceipt: '#8E8E93',
  failedMessage: '#FF453A',
  pendingMessage: '#8E8E93',
  replyBackground: '#1C1C1E',
  mentionHighlight: 'rgba(10, 132, 255, 0.3)',
  background: '#000000',
  surface: '#1C1C1E',
  border: '#38383A',
};

const defaultDimensions: AbrovaChatDimensions = {
  messageBubbleRadius: 16,
  messagePadding: 12,
  avatarSize: 40,
  smallAvatarSize: 24,
  inputFieldRadius: 24,
  maxBubbleWidthRatio: 0.75,
  imagePreviewSize: 320,
  reactionPillRadius: 12,
};

const AbrovaChatThemeContext = createContext<AbrovaChatThemeValue>({
  colors: defaultLightColors,
  dimensions: defaultDimensions,
  isDark: false,
});

export interface AbrovaChatThemeProviderProps {
  children: ReactNode;
  colors?: Partial<AbrovaChatColors>;
  dimensions?: Partial<AbrovaChatDimensions>;
  /**
   * `true` dark, `false` light (default), or `'system'` to follow the
   * device's light / dark setting, live.
   */
  dark?: boolean | 'system';
}

const DARK_QUERY = '(prefers-color-scheme: dark)';

/** Whether the system is in dark mode now, following changes. Only listens when `enabled`. */
function useSystemDark(enabled: boolean): boolean {
  const read = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(DARK_QUERY).matches
      : false;
  const [isDark, setIsDark] = useState(() => (enabled ? read() : false));

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia(DARK_QUERY);
    const update = () => setIsDark(query.matches);
    update();
    if (query.addEventListener) {
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }
    query.addListener(update); // older Safari
    return () => query.removeListener(update);
  }, [enabled]);

  return isDark;
}

/**
 * Provides AbrovaChat theme to child components
 */
export function AbrovaChatThemeProvider({
  children,
  colors,
  dimensions,
  dark = false,
}: AbrovaChatThemeProviderProps) {
  const systemDark = useSystemDark(dark === 'system');
  const isDark = dark === 'system' ? systemDark : dark;
  const theme = useMemo<AbrovaChatThemeValue>(() => {
    const baseColors = isDark ? defaultDarkColors : defaultLightColors;
    return {
      colors: { ...baseColors, ...colors },
      dimensions: { ...defaultDimensions, ...dimensions },
      isDark,
    };
  }, [colors, dimensions, isDark]);

  return (
    <AbrovaChatThemeContext.Provider value={theme}>
      {children}
    </AbrovaChatThemeContext.Provider>
  );
}

/**
 * Hook to access AbrovaChat theme
 */
export function useAbrovaChatTheme(): AbrovaChatThemeValue {
  return useContext(AbrovaChatThemeContext);
}

/**
 * Default exports
 */
export { defaultLightColors, defaultDarkColors, defaultDimensions };
