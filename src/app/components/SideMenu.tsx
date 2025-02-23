import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface SideMenuProps {
  open: boolean;
  onClose: () => void;
}

export const SideMenu = ({ open, onClose }: SideMenuProps) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: '280px',
          bgcolor: '#fff',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{ width: 48, height: 48, mr: 2 }}
            src="/assets/icons/profile-avatar.png"
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Muhammed Ibrahim
            </Typography>
            <Typography variant="body2" color="text.secondary">
              UX UI designer
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 1 }}>
          <ListItem component={Link} href="/" sx={{ borderRadius: 1, mb: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Image
                src="/assets/icons/home-icon.svg"
                alt="Home"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem component={Link} href="/jobs" sx={{ borderRadius: 1, mb: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Image
                src="/assets/icons/jobs-icon.svg"
                alt="Jobs"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItem>

          <ListItem component={Link} href="/employers" sx={{ borderRadius: 1, mb: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Image
                src="/assets/icons/employers-icon.svg"
                alt="Employers"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary="Employers" />
          </ListItem>

          <ListItem component={Link} href="/notifications" sx={{ borderRadius: 1, mb: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Image
                src="/assets/icons/notifications-icon.svg"
                alt="Notifications"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItem>

          <ListItem component={Link} href="/messages" sx={{ borderRadius: 1, mb: 1 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Image
                src="/assets/icons/message-icon.svg"
                alt="Messaging"
                width={24}
                height={24}
              />
            </ListItemIcon>
            <ListItemText primary="Messaging" />
          </ListItem>
        </List>

        <List sx={{ px: 1, mt: 4 }}>
          <ListItem sx={{ borderRadius: 1, mb: 1 }}>
            <ListItemText primary="Setting and privacy" />
          </ListItem>
          <ListItem sx={{ borderRadius: 1, mb: 1 }}>
            <ListItemText primary="Language" />
          </ListItem>
          <ListItem sx={{ borderRadius: 1, mb: 1 }}>
            <ListItemText primary="Help" />
          </ListItem>
          <ListItem sx={{ borderRadius: 1, color: 'error.main' }}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};