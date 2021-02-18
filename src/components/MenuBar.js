import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  IconButton,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { menuItems } from "../routes/menuItems";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",

    backgroundColor: theme.palette.background.paper,
  },
  links: {
    textDecoration: "none",
    "&:active": {
      backgroundColor: theme.palette.background.default,
    },
  },
  dense: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  primary: {
    color: theme.palette.secondary.main,
  },
  button: {
    marginRight: theme.spacing(3),
  },
}));
export default function MenuBar() {
  const classes = useStyles();
  const [menu, setMenu] = useState({});
  const [selectedIndex, setSelectedIndex] = useState("");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleClick = (item) => {
    const menuchange = { [item]: !menu[item] };
    setMenu(menuchange);
  };

  const handler = (children) => {
    return children?.map((subOption, index) => {
      if (!subOption.children) {
        return (
          <div key={index}>
            <Link to={subOption.url} className={classes.links}>
              <ListItem
                className={classes.dense}
                dense
                button
                key={subOption.name}
                selected={selectedIndex === subOption.select}
                onClick={(event) =>
                  handleListItemClick(event, subOption.select)
                }
              >
                <IconButton
                  color="secondary"
                  edge="start"
                  size="medium"
                  className={classes.button}
                >
                  {subOption.icon}
                </IconButton>
                <ListItemText
                  primary={subOption.name}
                  className={classes.primary}
                />
              </ListItem>
            </Link>
          </div>
        );
      }
      return (
        <div key={index}>
          <ListItem
            button
            dense
            className={classes.dense}
            onClick={() => handleClick(subOption.name)}
            selected={selectedIndex === subOption.select}
          >
            <IconButton
              color="primary"
              edge="start"
              size="medium"
              className={classes.button}
            >
              {subOption.icon}
            </IconButton>{" "}
            <ListItemText primary={subOption.name} />
            {menu[subOption.name] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={menu[subOption.name]} timeout="auto" unmountOnExit>
            {handler(subOption.children)}
          </Collapse>
        </div>
      );
    });
  };
  return (
    <div className={classes.root}>
      <List component="nav">{handler(menuItems)}</List>
    </div>
  );
}
