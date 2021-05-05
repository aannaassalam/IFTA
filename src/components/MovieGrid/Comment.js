import React from "react";
import { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";
import { Launcher } from 'react-chat-window'
import $ from 'jquery';
import axios from 'axios';

const CommentBox = function ({ movies, comments }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        var elements = document.querySelectorAll('.Linkify');
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let text = element.innerHTML;
            let data = text.split(' voted for ');
            let comment = data[1].split('\n');
            element.innerHTML = `<strong><b>${data[0]}</b></strong> voted for <span style="font-weight:normal ; color:grey">${comment[0]}</span>\n${comment[1]}`
        }
    })

    useEffect(() => {
        setMessageList(comments);
    }, [comments]);

    useEffect(() => {
        // const scrollPosition = sessionStorage.getItem("scrollPosition");
        // if (scrollPosition) {
        //     console.log(scrollPosition);
        //     document.querySelector('.sc-message-list').scrollTo(0, parseInt(scrollPosition));
        //     sessionStorage.removeItem("scrollPosition");
        // }
    })

    useEffect(() => {
        if (isFetching) {
            axios.get('/award/audienceComments?id=' + movies._id + '&page=' + page)
                .then(
                    (res) => {
                        sessionStorage.setItem("scrollPosition", document.querySelector('.sc-message-list').scrollHeight);
                        setMessageList(() => {
                            let old_comments = [];
                            let received = res.data.payload;
                            for (let comment of received) {
                                if (comment.comment) {
                                    old_comments.push({
                                        author: comment.user.userName,
                                        type: 'text',
                                        data: {
                                            text: `@${comment.user.userName} voted for "${comment.award.nominations.name.split('(')[0].trim()}" \n${comment.comment}`
                                        }
                                    })
                                }
                            }
                            return old_comments;
                        })
                        setIsFetching(false);
                        setPage((page) => page + 1);
                    }
                ).catch(err => {
                    console.log(err);
                })
        }
    }, [isFetching, movies])

    const toggle = () => setIsOpen(!isOpen);
    CommentBox.handleClickOutside = () => setIsOpen(false);


    $('.sc-message-list').on('scroll', () => {
        if ($('.sc-message-list').scrollTop() === 0) {
            if (!isFetching) {
                setIsFetching(true);
            }
        }
    })

    return (
        <React.Fragment>
            <Launcher
                agentProfile={{
                    teamName: movies.heading ? `Audience Comments - "${movies.heading.trim()}"` : '',
                }}
                messageList={messageList}
                isOpen={isOpen}
                handleClick={() => toggle()}
            />
        </React.Fragment>
    )
};

const clickOutsideConfig = {
    handleClickOutside: () => CommentBox.handleClickOutside
};

export default onClickOutside(CommentBox, clickOutsideConfig);