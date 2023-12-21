import { useCallback, useContext, useEffect, useState } from 'react';
import NewComment from './NewComment';
import CommentList from './CommentList';
import { CommentType } from '@/pages/api/comments/[eventId]';
import { NotificationContext } from '@/store/notification-context';
import classes from './Comments.module.css';
import axios from 'axios';

type CommentsProps = {
  eventId: string;
};

export default function Comments({ eventId }: CommentsProps) {
  const notificationCtx = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState<boolean>(false);

  const fetchComments = useCallback(
    async (evId: string) => {
      try {
        setIsFetchingComments(true);
        const { data } = await axios.get(`/api/comments/${evId}`);
        setComments(data.comments);
        setIsFetchingComments(false);
      } catch (error: any) {
        notificationCtx.showNotification({
          title: 'Error!',
          message:
            error?.response?.data?.message ||
            error?.message ||
            JSON.stringify(error),
          status: 'error',
        });
      }
    },
    [notificationCtx]
  );

  useEffect(() => {
    if (showComments) {
      fetchComments(eventId);
    }
  }, [showComments, eventId, fetchComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = async (commentData: {
    email: string;
    name: string;
    text: string;
  }) => {
    try {
      notificationCtx.showNotification({
        title: 'Sending comment....',
        message: 'Please wait....',
        status: 'pending',
      });

      await axios({
        url: `/api/comments/${eventId}`,
        method: 'post',
        data: commentData,
      });

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Your comment was saved!',
        status: 'success',
      });
    } catch (error: any) {
      notificationCtx.showNotification({
        title: 'Error!',
        message:
          error?.response?.data?.message ||
          error?.message ||
          JSON.stringify(error),
        status: 'error',
      });
    }
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && isFetchingComments && <p>Loading....</p>}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
    </section>
  );
}
