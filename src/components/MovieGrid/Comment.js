import React, { useCallback, useRef } from "react";
import { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";
import { Launcher } from "react-chat-window";
import $ from "jquery";
import axios from "axios";
import FetchComments from "./fetchComments";
import {
  CircularProgress,
  ClickAwayListener,
  Fab,
  Modal,
} from "@material-ui/core";
import { ChatBubble, Close } from "@material-ui/icons";

const CommentBox = function ({ movies }) {
  const [isOpen, setIsOpen] = useState();
  const [page, setPage] = useState(0);

  const { loading, hasMore, err, comments } = FetchComments(movies, page);

  const observer = useRef();
  const firstCommentElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current = null;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // console.log(movies);

  // useEffect(() => {
  //   var elements = document.querySelectorAll(".Linkify");
  //   for (let i = 0; i < elements.length; i++) {
  //     let element = elements[i];
  //     let text = element.innerHTML;
  //     let data = text.split(" voted for ");
  //     let comment = data[1].split("\n");
  //     element.innerHTML = `<strong><b>${data[0]}</b></strong> voted for <span style="font-weight:normal ; color:grey">${comment[0]}</span>\n${comment[1]}`;
  //   }
  // });

  // useEffect(() => {
  //   if (isOpen) {
  //     var element = document.getElementById("comment-body");
  //     console.log(element);
  //     element.scrollTop = element.scrollHeight;
  //   }
  // }, [isOpen]);

  // useEffect(() => {
  //     setTimeout(() => {
  //         let scrollPosition = ((messageList.length - 100) / messageList.length) * (document.querySelector('.sc-message-list').scrollHeight)
  //         if (scrollPosition > 0) {
  //             console.log(document.querySelector('.sc-message-list').scrollHeight,scrollPosition,messageList.length);
  //             document.querySelector('.sc-message-list').scrollBy(0,0);
  //             document.querySelector('.sc-message-list').scrollBy(0, parseInt(-scrollPosition));
  //         }
  //     }, 200)
  // }, [messageList])

  // const fetch = () => {
  //   if (isFetching) {
  //     axios
  //       .get("/award/audienceComments?id=" + movies._id + "&page=" + page)
  //       .then((res) => {
  //         // console.log(res.data.payload);
  //         setMessageList(() => {
  //           let old_comments = [];
  //           let received = res.data.payload;
  //           for (let comment of received) {
  //             if (comment.comment) {
  //               old_comments.push({
  //                 author: comment.user.userName,
  //                 type: "text",
  //                 data: {
  //                   text: `@${
  //                     comment.user.userName
  //                   } voted for "${comment.award.nominations.name
  //                     .split("(")[0]
  //                     .trim()}" \n${comment.comment}`,
  //                 },
  //               });
  //             }
  //           }
  //           return old_comments;
  //         });
  //         // setIsFetching(false);
  //         setPage((page) => page + 1);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  // const messageList = () => {
  //   return
  // };

  // const toggle = () => setIsOpen(!isOpen);
  // CommentBox.handleClickOutside = () => setIsOpen(false);

  // $(".sc-message-list").on("scroll", () => {
  //   if ($(".sc-message-list").scrollTop() === 0) {
  //     // if (!isFetching) {
  //     //   setIsFetching(true);
  //     // }
  //     fetch();
  //   }
  // });

  return (
    <React.Fragment>
      {/* <Launcher
        agentProfile={{
          teamName: movies.heading
            ? `Audience Comments - "${movies.heading.trim()}"`
            : "",
        }}
        messageList={messageList}
        isOpen={isOpen}
        handleClick={() => toggle()}
      /> */}

      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <div>
          <Fab
            // color="primary"
            className="fab"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <Close /> : <ChatBubble />}
          </Fab>
          {/* <Modal open={isOpen} onClose={() => setIsOpen(false)}> */}
          {isOpen && (
            <div className="comments-modal">
              <div className="head">Comments</div>
              <div className="body" id="comment-body">
                {comments.map((comment, index) => {
                  return (
                    <div
                      className="user-comment"
                      ref={
                        index === comments.length - 1
                          ? firstCommentElementRef
                          : null
                      }
                      key={index}
                    >
                      <div className="left">
                        <img src={comment.user.avatar} alt="" />
                      </div>
                      <div className="right">
                        <h5 className="name">
                          {comment.user.userName}{" "}
                          <span>
                            voted for {comment.award.nominations.name}
                          </span>
                        </h5>

                        <h4>{comment.comment}</h4>
                      </div>
                    </div>
                  );
                })}
                {loading && (
                  <CircularProgress
                    style={{ color: "#aaa", marginTop: 10 }}
                    // size="mediium"
                  />
                )}
                {err && <p>Error...</p>}
              </div>
            </div>
          )}
        </div>
      </ClickAwayListener>
      {/* </Modal> */}
    </React.Fragment>
  );
};

// const clickOutsideConfig = {
//   handleClickOutside: () => CommentBox.handleClickOutside,
// };

export default CommentBox;
