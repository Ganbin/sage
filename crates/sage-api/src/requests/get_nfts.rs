use serde::{Deserialize, Serialize};
use specta::Type;

#[derive(Debug, Clone, Copy, Serialize, Deserialize, Type)]
pub struct GetNfts {
    pub offset: u32,
    pub limit: u32,
}
