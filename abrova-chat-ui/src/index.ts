/**
 * @abrova/web-chat-ui - React Chat Components for AbrovaChat SDK
 *
 * A comprehensive UI toolkit for building chat interfaces with React.
 *
 * ## Quick Start
 *
 * ```tsx
 * import { AbrovaChatProvider, ChatScreen, AbrovaChatThemeProvider } from '@abrova/web-chat-ui';
 *
 * function App() {
 *   return (
 *     <AbrovaChatProvider client={abrovaChatClient}>
 *       <AbrovaChatThemeProvider>
 *         <ChatScreen
 *           roomId="room-123"
 *           currentUserId="user-456"
 *         />
 *       </AbrovaChatThemeProvider>
 *     </AbrovaChatProvider>
 *   );
 * }
 * ```
 */

// State Management
export {
  AbrovaChatProvider,
  useAbrovaChatClient,
  useAbrovaChatConnection,
  type AbrovaChatProviderProps,
  type AbrovaChatConfig,
  type AbrovaChatClient,
  type Message,
  type Room,
  type Participant,
  type Attachment,
  type Reaction,
} from './state/AbrovaChatProvider';

// Hooks
export {
  useChatChannel,
  type ChatChannelState,
  type ChatChannelActions,
} from './hooks/useChatChannel';

// Theme
export {
  AbrovaChatThemeProvider,
  useAbrovaChatTheme,
  type AbrovaChatThemeProviderProps,
  type AbrovaChatColors,
  type AbrovaChatDimensions,
  type AbrovaChatThemeValue,
  defaultLightColors,
  defaultDarkColors,
  defaultDimensions,
} from './theme/AbrovaChatTheme';

// Components
export {
  ChatScreen,
  type ChatScreenProps,
  type FileUploader,
} from './components/ChatScreen';

export {
  ChatMessageBubble,
  type ChatMessageBubbleProps,
} from './components/ChatMessageBubble';

export {
  ChatInputField,
  type ChatInputFieldProps,
} from './components/ChatInputField';

export {
  TypingIndicator,
  TypingDots,
  CompactTypingIndicator,
  type TypingIndicatorProps,
  type TypingDotsProps,
  type CompactTypingIndicatorProps,
} from './components/TypingIndicator';

export {
  PresenceIndicator,
  PresenceStatus,
  type PresenceIndicatorProps,
  type PresenceStatusProps,
} from './components/PresenceIndicator';

export {
  UnreadBadge,
  UnreadDot,
  type UnreadBadgeProps,
  type UnreadDotProps,
} from './components/UnreadBadge';

export {
  MessageContextMenu,
  type MessageContextMenuProps,
  type MessageAction,
} from './components/MessageContextMenu';

export {
  MessageReactionPicker,
  MessageReactions,
  defaultReactions,
  type MessageReactionPickerProps,
  type MessageReactionsProps,
} from './components/MessageReactionPicker';

export {
  ChatRoomListTile,
  ChatRoomListTileSkeleton,
  type ChatRoomListTileProps,
} from './components/ChatRoomListTile';

export {
  SwipeableMessage,
  type SwipeableMessageProps,
} from './components/SwipeableMessage';

export {
  ReplyPreview,
  InlineReplyIndicator,
  type ReplyPreviewProps,
  type ReplyMessage,
  type InlineReplyIndicatorProps,
} from './components/ReplyPreview';

export {
  ReadReceipts,
  ReadStatus,
  ReadReceiptList,
  type ReadReceiptsProps,
  type ReadReceiptUser,
  type ReadStatusProps,
  type ReadReceiptListProps,
} from './components/ReadReceipts';

export {
  MentionsList,
  MentionChip,
  type MentionsListProps,
  type MentionUser,
  type MentionChipProps,
} from './components/MentionsList';

export {
  VoiceMessageRecorder,
  VoiceMessagePlayer,
  type VoiceMessageRecorderProps,
  type VoiceMessagePlayerProps,
} from './components/VoiceMessageRecorder';

export {
  MessageSearchBar,
  HighlightedText,
  type MessageSearchBarProps,
  type SearchResult,
  type HighlightedTextProps,
} from './components/MessageSearchBar';

export {
  LinkPreview,
  extractUrls,
  isValidUrl,
  type LinkPreviewProps,
  type LinkMetadata,
} from './components/LinkPreview';

export {
  ChatAttachmentPicker,
  AttachmentPreview,
  type ChatAttachmentPickerProps,
  type AttachmentPreviewProps,
  type AttachmentOption,
  type SelectedAttachment,
} from './components/ChatAttachmentPicker';
