import React from "react";
import { useState } from "react";
import onClickOutside from "react-onclickoutside";
import { Launcher } from 'react-chat-window'

const CommentBox = function ({ movies, comments }){
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    CommentBox.handleClickOutside = () => setIsOpen(false);
    return (
        <React.Fragment>
            <Launcher
                agentProfile={{
                    teamName: movies.heading ? `Audience Comments \n (${movies.heading.trim()})` : '',
                }}
                messageList={comments}
                isOpen={isOpen}
                handleClick={()=>toggle()}
            />
        </React.Fragment>
    )
};

const clickOutsideConfig = {
    handleClickOutside: () => CommentBox.handleClickOutside
};

export default onClickOutside(CommentBox, clickOutsideConfig);